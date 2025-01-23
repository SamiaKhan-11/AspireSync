import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [generatedContent, setGeneratedContent] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle the file upload and sending to backend
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a resume to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        setLoading(true);

        try {
            // Sending the file to the backend for AI processing
            const response = await axios.post("/api/resume/upload-resume", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Handling AI-generated content
            setGeneratedContent(response.data.content);
        } catch (error) {
            console.error("Error uploading resume:", error);
            alert("Failed to upload resume.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="file-input"
            />
            <button onClick={handleUpload} className="button" disabled={loading}>
                {loading ? "Uploading..." : "Upload Resume"}
            </button>

            {generatedContent && <div className="output">{generatedContent}</div>}
        </div>
    );
};

export default ResumeUpload;
