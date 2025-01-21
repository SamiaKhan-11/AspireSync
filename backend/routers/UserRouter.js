const express = require('express');
const Model = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifytoken');
require('dotenv').config();

const router = express.Router();

router.post('/add', (req, res) => {         //request method for add->post

   console.log(req.body);

   new Model(req.body).save()
      .then((result) => {
         res.status(200).json(result);

      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

//getall
router.get('/getall', (req, res) => {                  //request method for read/getall -> get
   Model.find()
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

//: denotes url parameter
router.get('/getbycity/:city', (req, res) => {
   console.log(req.params.city);

   Model.find({ city: req.params.city })
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});


router.get('/getbyemail/:email', (req, res) => {
   Model.find({ email: req.params.email })
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/get-detail', verifyToken, (req, res) => {
   Model.findById(req.user._id)

       .then((result) => {
           if (result) {
               res.status(200).json(result);
           } else {
               res.status(404).json({ message: "User not found" });
           }
       })
       .catch((err) => {
           console.log(err);
           res.status(500).json({ message: "Error fetching user data", error: err });
       });
});


//getbyid
router.get('/getbyid/:id', (req, res) => {
   Model.findById(req.params.id)
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/getbyid', (req, res) => {
   Model.findById(req.user.id)
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});


//update
router.put('/update', verifyToken, (req, res) => {
   Model.findByIdAndUpdate(req.user._id, req.body, { new: true })

       .then((result) => {
           if (result) {
               res.status(200).json(result);
           } else {
               res.status(404).json({ message: "User not found" });
           }
       })
       .catch((err) => {
           console.log(err);
           res.status(500).json({ message: "Error updating User info", error: err });
       });
});
//delete
router.delete('/delete/:id', (req, res) => {
   Model.findByIdAndDelete(req.params.id)
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         res.status(500).json(err)
      });
});


router.post('/authenticate', (req, res) => {
   Model.findOne(req.body)
      .then((result) => {
         if (result) {

            //payload-, secret key, expiry, callback

            const { _id, email, password } = result;
            const payload = { _id, email, password };

            jwt.sign(
               payload,
               process.env.JWT_SECRET,
               { expiresIn: '10hr' },
               (err, token) => {
                  if (err) {
                     console.log(err);
                     res.status(500).json(err)
                  } else {
                     res.status(200).json({ token: token })
                  }
               }
            )
         } else {
            res.status(401).json({ message: 'Invalid Credentials' })
         }
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err)
      });
})
module.exports = router;





