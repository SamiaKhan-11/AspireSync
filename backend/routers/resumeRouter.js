const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const generateContentWithGoogleGemini = require("../utils/googleGenerativeAIService");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const router = express.Router();

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for resume upload and AI processing
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
    if (!req.file) {
        console.error("No file uploaded.");
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        let content = "";

        // Check file type and extract text accordingly
        if (req.file.mimetype === "application/pdf") {
            // Parse PDF content
            const pdfContent = await pdfParse(req.file.buffer);
            content = pdfContent.text;
        } else if (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            // Parse DOCX content (for simplicity, using text extraction)
            const docxContent = req.file.buffer.toString();
            content = docxContent; // You can enhance this to extract specific text
        } else {
            return res.status(400).json({ error: "Unsupported file type" });
        }

        // Send parsed content to Google Gemini for AI processing
        const aiResponse = await generateContentWithGoogleGemini(content);

        // Return the AI-generated content
        res.json({ content: aiResponse });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Failed to process the resume" });
    }
});

module.exports = router;

