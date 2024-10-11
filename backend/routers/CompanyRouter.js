const express = require('express');
const Model = require('../models/CompanyModel');
const Model2 = require('../models/CompanyAuthModel')
const router = express.Router();

// Create a new company entry
router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
   
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error adding company", error: err });
        });
});

// Get all company listings
router.get('/getall', (req, res) => {
    Model.find()
  
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error fetching companies", error: err });
        });
});

// Get a company by ID
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
   
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Company not found" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error fetching company", error: err });
        });
});

// Update a company by ID
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
   
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Company not found" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error updating company", error: err });
        });
});

// Delete a company by ID
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    
        .then((result) => {
            if (result) {
                res.status(200).json({ message: "Company deleted", result });
            } else {
                res.status(404).json({ message: "Company not found" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Error deleting company", error: err });
        });
});

module.exports = router;
