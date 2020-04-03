const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    urlname:{
        type: String,
        required: true
    },
    displayname:{
        type: String,
        required: true
    },
    alt:{
        type: String,
        default: ''
    },
    caption:{
        type: String,
        default: ''
    },
    description:{
        type: String,
        default: ''
    },
    type:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    month:{
        type: Number,
        required: true
    },
    deleteItem:{
        type: Number,
        default: 0
    }
},{ timestamps: true });

const UploadImage = mongoose.model('UploadImage', imageSchema);
module.exports = { UploadImage }