const mongoose = require('mongoose');

/**
 * mongoose writer schema
 */

const writerSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },

    gender:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }

});

//model which provides us with an interface to iteract with our data
const WriterModel = mongoose.model('Writer', writerSchema);

module.exports = WriterModel;