const express = require('express')
const SubscriptionModel = require('../models/SubscriptionModel');
const verifyToken = require('../middlewares/verifytoken');
const router = express.Router();
const Model = require('../models/SubscriptionModel');

router.post('/add', verifyToken, async (req, res) => {
   const { companyId } = req.body;
   const { _id } = req.user;

   try {
      // Check if the user has already subscribed to the company
      const existingSubscription = await SubscriptionModel.findOne({ companyId, _id });

      if (existingSubscription) {
         return res.status(400).json({ message: 'Already subscribed to this company.' });
      }

      // Create a new subscription entry in the database
      const newSubscription = new SubscriptionModel({
         company: companyId,
         user: _id
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

router.get('/getbyuser', verifyToken, async (req, res) => {
   const { _id } = req.user;

   try {
      const subscriptions = await SubscriptionModel.find({ user: _id }).populate('company', 'name');
      res.status(200).json(subscriptions);
   } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ message: 'Failed to fetch subscriptions' });
   }
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

router.get('/check-subscription/:companyid', verifyToken, async (req, res) => {
   const { _id } = req.user;
   const { companyid } = req.params;

   try {
      const subscription = await SubscriptionModel.findOne({ company: companyid, user: _id });
      res.status(200).json({ isSubscribed: !!subscription });
   } catch (error) {
      console.error('Error checking subscription:', error);
      res.status(500).json({ message: 'Failed to check subscription' });
   }
});

router.get('/getbycompany', verifyToken, async (req, res) => {
   const { _id } = req.user;
   const { companyid } = req.params;

   try {
      const subscription = await SubscriptionModel.find({ company: req.user._id });
      res.status(200).json({ isSubscribed: !!subscription });
   } catch (error) {
      console.error('Error checking subscription:', error);
      res.status(500).json({ message: 'Failed to check subscription' });
   }
});

module.exports = router;