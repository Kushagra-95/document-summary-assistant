# 📄 Document Summary Assistant

A web application that allows users to upload PDF and image files, extract text (via parsing or OCR), and generate smart summaries with different length options.  
Built as part of a technical assessment project.

---

## Features
- **Document Upload**: Upload PDFs or images (PNG/JPG).
- **Text Extraction**:
  - PDF parsing to extract text while preserving structure.
  - OCR (Optical Character Recognition) for scanned images using [Tesseract](https://github.com/tesseract-ocr/tesseract).
- **Summarization**:
  - AI-powered summaries using [Gemini API] (or any LLM service).
  - Choose summary length: **short**, **medium**, or **long**.
- **File Handling**:
  - Temporary storage of uploaded files.
  - Safe cleanup after processing.
- **UI/UX**:
  - Simple interface for uploading and viewing summaries.
  - Mobile responsive.

---

##  Tech Stack
- **Backend**: Node.js, Express
- **Middleware**: Multer (file upload handling)
- **Text Extraction**: `pdf-parse`, Tesseract OCR
- **Summarization**: Gemini API (can be replaced with OpenAI or any LLM)
- **Frontend**: React + Tailwind (or your chosen stack)
- **Deployment**: Vercel / Netlify / Heroku

---

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/document-summary-assistant.git
   cd document-summary-assistant
2. **Install dependencies**
```bash
npm install
```
3. **Set environment variables**
```bash
Create a .env file in the root directory and add:

GEMINI_API_KEY=your_api_key_here
PORT=5000
```
4. **Run the app**
```bash
npm start
```
