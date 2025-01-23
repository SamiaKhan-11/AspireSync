const nodemailer = require("nodemailer");
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Model = require('../models/UserModel');
const generatedOTP = {};

const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const myStorage = multer({ storage: storage });

const router = express.Router();

const getOTPTemplate = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <h1>Your OTP of Resetting Password is : ${otp}</h1>

</body>
</html>`
}

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
    },
});

function generateNewOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendMail = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails)
        callback(info);
    } catch (error) {
        console.log(error);
    }
};

router.post('/send-otp', (req, res) => {

    const { recipient } = req.body;
    const otp = generateNewOTP();
    generatedOTP[recipient] = otp;

    const mailDetails = {
        from: process.env.EMAIL_ID,
        to: recipient,
        subject: 'OTP for new password',
        html: getOTPTemplate(otp)
    }

    sendMail(mailDetails, (info) => {
        res.status(200).json(info);
    })

})

router.post('/verify-otp', (req, res) => {
    const { recipient, otp } = req.body;

    if (generatedOTP[recipient] === otp) {
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'OTP verification failed' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Model.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = password;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

router.post('/send-reset-link', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Model.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        const mailDetails = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'Password Reset Link',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        };

        await transporter.sendMail(mailDetails);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.post("/gemini-uploadfile", myStorage.single("myfile"), (req, res) => {
    // res.status(200).json({ status: "success" });
    console.log(req.file);
    // return;

    fileManager.uploadFile(
        `./uploads/${req.file.originalname}`,
        {
            mimeType: req.file.mimetype,
            displayName: "Uploaded Image",
        },
    ).then((uploadResult) => {
        // View the response.
        console.log(
            `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
        );

        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log(uploadResult);
        return res.status(200).json({ ...uploadResult });
        // model.generateContent([
        //     "Tell me about this image.",
        //     {
        //         fileData: {
        //             fileUri: 'https://bestrecipesuk.com/wp-content/uploads/2020/01/Chocolate-Cake-800x840.jpg?crop=1',
        //             mimeType: 'image/jpeg',
        //         },
        //     },
        // ])
        //     .then((result) => {
        //         console.log(result.response.text());
        //     }).catch((err) => {
        //         console.log(err);

        //     });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "Error uploading file" });
    });
});


module.exports = router;