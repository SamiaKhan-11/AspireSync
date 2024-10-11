const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/offcampusinterview'

mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    
}).catch((err) => {
    console.log(err);
    
});

module.exports = mongoose;