const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
  const token = req.headers[ 'x-auth-token' ];

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    ( err,payload) => {
        if(err){
           console.log(err);
           res.status(500).json(err)
           
        } else {
              res.user = payload;
              next();
        }
    }
  )
}

module.exports = verifyToken;