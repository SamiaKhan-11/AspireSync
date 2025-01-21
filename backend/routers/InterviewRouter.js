const express = require('express')
const Model = require('../models/InterviewModel');
const verifyToken = require('../middlewares/verifytoken');
const SubscriptionModel = require('../models/SubscriptionModel');

const nodemailer = require("nodemailer");
require('dotenv').config();

const getOTPTemplate = (link) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <h1>Your subscription mail</h1>

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

const sendMail = async (mailDetails, callback) => {
   try {
       const info = await transporter.sendMail(mailDetails)
       callback(info);
   } catch (error) {
       console.log(error);
   }
};


const router = express.Router();

router.post('/add', verifyToken, (req, res) => {
   req.body.company = req.user._id;
   console.log(req.body);
  
   new Model(req.body).save()

      
   
   .then((result) => {
          SubscriptionModel.find({ company : req.user._id}).populate('user')
         .then((subList) => {
            // console.log(subList.contactEmail);
            const mailList = subList.map((sub) => sub.user.email);
            console.log(mailList);

            mailList.forEach((recipient) => {
               const mailDetails = {
                  from: process.env.EMAIL_ID,
                  to: recipient,
                  subject: 'interview alert',
                  html: getOTPTemplate('hjsgdhj')
              }
          
              sendMail(mailDetails, (info) => {
                  console.log(info);
               })
            })
            
            
            
            res.status(200).json(result);
            
         }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
            
         });

      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/getall', (req, res) => {
   Model.find().populate('company')
      .then((result) => {
         res.status(200).json(result);

      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/getbyid/:id', (req, res) => {
   Model.findById(req.params.id)
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.put('/update/:id', (req, res) => {                    //request method for update -> put 
   Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.delete('/delete/:id', (req, res) => {
   Model.findByIdAndDelete(req.params.id)
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         res.status(500).json(err)
      });
});

module.exports = router;