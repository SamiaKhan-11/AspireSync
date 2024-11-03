const express = require('express')
const Model = require('../models/SubscriptionModel');
const router = express.Router();

router.post('/add', async (req, res) => {
   const { companyId, userId } = req.body;

   try {
      // Check if the user has already subscribed to the company
      const existingSubscription = await SubscriptionModel.findOne({ companyId, userId });

      if (existingSubscription) {
         return res.status(400).json({ message: 'Already subscribed to this company.' });
      }

      // Create a new subscription entry in the database
      const newSubscription = new SubscriptionModel({
         companyId,
         userId,
         status: 'active', // default to active
      });

      // Save the subscription
      const result = await newSubscription.save();

      res.status(200).json({ message: 'Subscription successful', subscription: result });
   } catch (error) {
      console.error('Subscription error:', error);
      res.status(500).json({ message: 'Failed to subscribe', error });
   }
});

router.get('/getall', (req, res) => {                  //request method for read/getall -> get
   Model.find()
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/getbyuser/:user', (req, res) => {
   console.log(req.params.city);

   Model.find({ city: req.params.city })
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});


router.get('/getbycompany/:company', (req, res) => {
   Model.find({ email: req.params.email })
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
})
//delete
router.delete('/delete/:id', (req, res) => {
   Model.findByIdAndDelete(req.params.id)
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         res.status(500).json(err)
      });
});

module.exports = router;