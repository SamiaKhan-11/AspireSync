const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // Load environment variables

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generateContent = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text;
    } catch (error) {
        console.error("Error generating content:", error.message);
        throw new Error("Failed to generate AI content.");
    }
};

module.exports = { generateContent };
