const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require("moment");
const jwt = require('jsonwebtoken');
const SALT_I = 10;
const config = require('./../config/config').get(process.env.NODE_ENV)

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxlangth: 100
    },
    age:{
        type: Number,
        default: 0
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        default: 0
    },
    address:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    role:{
        type: String,
        required: true
    },
    post:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        required: true
    },
    profileimage:{
        type: Schema.Types.ObjectId,
        ref: 'UploadImage'
    },
    password:{
        type: String,
        required: true,
        minlangth: 6
    },
    token:{
        type: String
    },
    resetToken:{
        type: String
    },
    resetTokenExp:{
        type: Number
    },
    deleteItem:{
        type: Number,
        default: 0
    }
},{ timestamps: true })

userSchema.pre( 'save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
    
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
} )

userSchema.methods.comparePassword = function(userPassword, cb){
    bcrypt.compare(userPassword, this.password, function(err, isMatch){
        if(err) return cb(err);

        cb(null, isMatch);
    })
}

userSchema.methods.generateResetToken = function(cb){
    var user = this;

    crypto.randomBytes(20, function(err, buffer){
        let token = buffer.toString('hex');
        let today = moment().startOf('day').valueOf();
        let tomorrow = moment(today).endOf('day').valueOf();

        user.resetToken = token;
        user.resetTokenExp = tomorrow;
        user.save( function(err, user){
            if(err) return cb(err);
            cb(null, user)
        } )
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;

    var token = jwt.sign(user._id.toHexString(), config.SECRET);
    user.token= token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
    
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token, config.SECRET, function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err);

            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema);
module.exports = { User };