const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/swapp', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('Success! Database is connected.');
    } else {
        console.error(err);
    }
});

require('./person.model');