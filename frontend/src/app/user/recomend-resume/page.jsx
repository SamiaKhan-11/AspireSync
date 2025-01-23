import React from 'react';
import {
    GoogleGenerativeAI, HarmCategory,
    HarmBlockThreshold
} from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GOOGLE_API_KEY,
);

const Recommend = () => {

    const getResponseForGivenPrompt = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent();
            console.log(result);

            const response = result.response;
            const text = response.text();
            setpromptResponses([
                ...promptResponses,
                text
            ]);
            console.log(response);
            console.log(text);

        }
        catch (error) {
            console.log("Something Went Wrong");
        }
    };

    async function uploadToGemini(path, mimeType) {
        const uploadResult = await fileManager.uploadFile(path, {
            mimeType,
            displayName: path,
        });
        const file = uploadResult.file;
        console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
        return file;
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
    });

    const generationConfig = {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const uploadFile = (e) => {
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append("myfile", file);
        fetch("https://mern-workshop.onrender.com/uploadfile", {
            method: "POST",
            body: fd,
        }).then((res) => {
            if (res.status === 200) {
                console.log("file uploaded");
                res.json().then((data) => {
                    console.log(data);
                    const { file } = data;
                    setImageData(file);
                    run(file);
                });
            }
        });
    };

    const run = async ({ uri, mimeType }) => {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            fileData: {
                                mimeType,
                                fileUri: uri,
                            },
                        },
                        { text: "Accurately identify the food in the image and provide an appropriate recipe consistent with your analysis. " },
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
        console.log(result.response.text());
        setMarkdownResponse(result.response.text());
    }

    return (
        <div>Recommend

<input type="file" onChange={uploadFile} />
        </div>
    )
}

export default Recommend