
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import io
import base64
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load the model
try:
    model = load_model('model.h5')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        # Get the image from request
        file = request.files['image']
        img = Image.open(io.BytesIO(file.read()))
        
        # Preprocess the image
        img = img.resize((224, 224))  # Resize to model input size
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalize
        
        # Make prediction
        predictions = model.predict(img_array)
        
        # Get class with highest probability
        class_indices = {0: "Grade 0 (Normal)", 1: "Grade 3 (Moderate)", 2: "Grade 4 (Severe)"}
        predicted_class_index = np.argmax(predictions[0])
        predicted_class = class_indices[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])
        
        # Create probabilities dictionary
        probabilities = {
            "Grade 0 (Normal)": float(predictions[0][0]),
            "Grade 3 (Moderate)": float(predictions[0][1]),
            "Grade 4 (Severe)": float(predictions[0][2])
        }
        
        # Generate heatmap (simple implementation, can be enhanced)
        # In a real application, you might want to use GradCAM or similar techniques
        img = np.array(img)
        heatmap = cv2.applyColorMap(
            cv2.resize(np.uint8(255 * predictions[0]), (224, 224)), 
            cv2.COLORMAP_JET
        )
        superimposed = cv2.addWeighted(img, 0.6, heatmap, 0.4, 0)
        
        # Convert heatmap to base64 for sending to frontend
        _, buffer = cv2.imencode('.png', superimposed)
        heatmap_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'probabilities': probabilities,
            'heatmapUrl': f'data:image/png;base64,{heatmap_base64}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
