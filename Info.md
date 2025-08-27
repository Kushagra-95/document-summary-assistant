# 📌 Project Information

## 🔗 Live Project
[Click here to view the project](https://document-summary-assistant-tau.vercel.app/)

## 💻 GitHub Repository
[Click here to view the code](https://github.com/Kushagra-95/document-summary-assistant)

---

## 📄 Short Approach Write-up

The project is a **Document Summary Assistant** that allows users to upload PDFs or image files and receive concise, AI-generated summaries.

For the **front-end**, I used **Vite + React** to build a clean and responsive interface where users can upload documents and view generated summaries. The UI includes basic loading states for better user experience.

For the **back-end**, I used **Node.js** to handle file uploads and text extraction. For PDFs, I leveraged Node.js libraries to parse and extract text while maintaining structure. For image files, OCR was applied to extract text from scanned documents.

Once the raw text is extracted, it is sent to the **Google Gemini API (Flash 1.5 model)**, which generates summaries at different lengths (short, medium, long). These summaries highlight the main ideas while keeping the output concise and readable.

The application is hosted on **Vercel** for easy deployment and scalability. Code quality, error handling, and modular structure were maintained to ensure production readiness.

Overall, the project demonstrates an end-to-end workflow of document upload → text extraction → AI-based summarization → user display.
