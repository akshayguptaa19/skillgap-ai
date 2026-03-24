import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
from resume_skill_extractor import process_resume

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/extract', methods=['POST'])
def extract_file_text():
    try:
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['file']
        jd_text = request.form.get('jd_text', None) # Get optional JD text
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
            
        # Save file to upload folder
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        # Extract text and process using backend function
        # Pass jd_text for optimization if available
        result_str = process_resume(filepath, jd_text=jd_text)
        result_data = json.loads(result_str)
        
        # cleanup
        if os.path.exists(filepath):
            os.remove(filepath)
            
        if "error" in result_data:
            return jsonify(result_data), 400
            
        return jsonify(result_data)
        
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
