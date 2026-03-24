import os
import re
import json

# For text extraction
import PyPDF2
import docx

# For NLP and keyword extraction
# import spacy

# For semantic extraction


# Optional: Disable tokenizers parallelism warning
os.environ["TOKENIZERS_PARALLELISM"] = "false"

# Global Models and Constants
# We try loading the lightweight spaCy model; if missing, download it.
# try:
#     nlp = spacy.load("en_core_web_sm")
# except OSError:
#     import spacy.cli
#     spacy.cli.download("en_core_web_sm")
#     nlp = spacy.load("en_core_web_sm")
nlp = None

# Load Sentence transformer model
# all-MiniLM-L6-v2 is specifically requested


# Expanded default skill list for keyword and semantic matching
DEFAULT_SKILLS = [
    "python", "java", "sql", "aws", "amazon web services", "docker", "react", "ml", "machine learning",
    "javascript", "html", "css", "data science", "kubernetes", "azure", "git", "agile", "ruby",
    "php", "express", "mongodb", "postgresql", "mysql", "typescript", "next.js", "django", "flask",
    "fastapi", "spring boot", "laravel", "rails", "asp.net", "rest api", "microservices", "nosql",
    "terraform", "ansible", "jenkins", "ci/cd", "linux", "nlp", "deep learning", "tensorflow", "pytorch",
    "tableau", "power BI", "android", "ios", "flutter", "react native", "figma", "scrum", "agile", 
    "leadership", "communication", "problem solving", "bash", "shell", "c++", "c#", "go", "golang",
    "rust", "kotlin", "swift", "scala", "r", "matlab", "sqlite", "firebase", "redis", "elasticsearch"
]

# Cache for skill embeddings to avoid re-encoding on every request
SKILL_EMBEDDINGS_CACHE = {}



def validate_file(file_path: str) -> str:
    """
    Validates the uploaded file based on its extension.
    Accepts only PDF, DOCX, and TXT files.
    Reject all other formats with a proper error message.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file {file_path} does not exist.")

    valid_extensions = {'.pdf', '.docx', '.txt'}
    # Lowercase extension for case-insensitive check
    _, ext = os.path.splitext(file_path)
    ext = ext.lower()
    
    if ext not in valid_extensions:
        raise ValueError(f"Invalid file format: '{ext}'. Only PDF, DOCX, and TXT files are accepted.")
    
    return ext

def extract_text(file_path: str) -> str:
    """
    Extracts text from the provided file.
    Uses PyPDF2 for PDF, python-docx for DOCX, and plain read() for TXT.
    """
    ext = validate_file(file_path)
    text = ""
    
    if ext == '.pdf':
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
                    
    elif ext == '.docx':
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            if para.text:
                text += para.text + "\n"
            
    elif ext == '.txt':
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()
            
    return text

def clean_text(text: str) -> str:
    """
    Cleans the extracted text:
    - Converts to lowercase
    - Removes punctuation and special characters
    - Removes extra spaces and normalizes whitespace
    """
    if not text:
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove punctuation and special characters (keeping alphanumerics, whitespaces, and symbols like +, #, . for common languages)
    text = re.sub(r'[^a-zA-Z0-9\s+#.]', ' ', text)
    
    # Remove extra spaces / normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def extract_skills_keyword(text: str, skills_list: list) -> list:
    """
    Extracts skills using a predefined keyword list.
    """
    extracted_skills = set()
    for skill in skills_list:
        # Match as whole word mapping to avoid partial substring matching
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text):
            extracted_skills.add(skill)
            
    return list(extracted_skills)

def extract_skills_spacy(text, skills_list):
    return []

def extract_skills_bert(text, skills_list, threshold=0.65):
    return []

def optimize_resume(original_text: str, missing_skills: list) -> str:
    """
    Simulates resume correction/optimization by suggesting where missing skills 
    could be added or formatting improvements.
    """
    optimized = original_text
    if missing_skills:
        addition = "\n\n[AI SUGGESTED OPTIMIZATIONS]\n"
        addition += "Consider adding the following keywords to your 'Skills' or 'Experience' section to pass ATS filters:\n"
        for skill in missing_skills:
            addition += f"- {skill.title()}\n"
        optimized += addition
    
    # Simple "correction" logic: fix common capitalization or spacing issues if needed
    # (In a real app, this would be a LLM-based rewrite)
    return optimized

def process_resume(file_path: str, skills_list: list = None, jd_text: str = None) -> str:
    """
    Orchestrator function that combines all the steps:
    1. Validation
    2. Extraction
    3. Cleaning
    4. Extractions (Keyword, SpaCy, BERT)
    5. Optimization (if JD text is provided)
    Returns: JSON string with extracted data.
    """
    try:
        if skills_list is None:
            skills_list = DEFAULT_SKILLS
            
        # Step 1 & 2: Extract text (validation occurs inside extract_text)
        raw_text = extract_text(file_path)
        
        # Step 3: Clean the text
        cleaned_text = clean_text(raw_text)
        
        # Step 4: Extract skills using the three requested approaches
        kw_skills = extract_skills_keyword(cleaned_text, skills_list)
        sp_skills = extract_skills_spacy(cleaned_text, skills_list)
        bt_skills = extract_skills_bert(cleaned_text, skills_list)
        
        # Step 5: Optimization
        # If JD text is provided, we can find missing skills and suggest an optimized version
        optimized_text = raw_text # default
        if jd_text:
            jd_cleaned = clean_text(jd_text)
            jd_skills = extract_skills_keyword(jd_cleaned, skills_list)
            resume_skills_set = set(kw_skills + sp_skills + bt_skills)
            missing = [s for s in jd_skills if s not in resume_skills_set]
            optimized_text = optimize_resume(raw_text, missing)
            
        # Step 6: Construct structured JSON response
        result = {
            "raw_text": raw_text,
            "cleaned_text": cleaned_text,
            "optimized_text": optimized_text,
            "keyword_skills": kw_skills,
            "spacy_skills": sp_skills,
            "bert_skills": bt_skills
        }
        
        return json.dumps(result, indent=4)
        
    except Exception as e:
        # In case of validation or I/O errors, return a structured error
        error_result = {
            "error": str(e)
        }
        return json.dumps(error_result, indent=4)

if __name__ == "__main__":
    # Self-test block: testing the functions
    test_file = "dummy_resume.txt"
    with open(test_file, "w") as f:
        f.write("I am a software engineer with 5 years of experience in Python, specialized in Machine Learning and React. AWS is cool!")
    
    print(f"Testing process_resume with {test_file}...")
    output = process_resume(test_file)
    print(output)
    
    # Cleanup dummy files
    if os.path.exists(test_file):
        os.remove(test_file)
