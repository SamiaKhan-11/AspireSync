import axios from 'axios';

// Replace these with your Google Gemini API credentials
const GEMINI_API_KEY = 'your-google-gemini-api-key';
const GEMINI_API_URL = 'https://gemini.googleapis.com/v1beta1/parseDocument';

export const parseResumeWithGemini = async (fileBuffer, fileType) => {
  try {
    // Encode the file in Base64
    const base64File = fileBuffer.toString('base64');

    // Create the request payload
    const payload = {
      document: {
        content: base64File,
        mimeType: fileType, // e.g., application/pdf or image/jpeg
      },
      settings: {
        extractEntities: true, // Enable entity extraction
      },
    };

    // Send the request to Google Gemini API
    const response = await axios.post(GEMINI_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GEMINI_API_KEY}`,
      },
    });

    // Return parsed data
    return response.data;
  } catch (error) {
    console.error('Error parsing resume with Google Gemini:', error.response?.data || error.message);
    throw new Error('Failed to parse resume with Google Gemini.');
  }
};
