const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');

// ===================================
//  User Middleware
// ===================================
const { auth } = require('./../middleware/auth');

// ===================================
//  User Authentication Check
// ===================================
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        fastname: req.user.fastname,
        lastname: req.user.lastname,
        role: req.user.role
    })
})

// ===================================
//  Upload Image Models
// ===================================
const { UploadImage } = require('./../models/uploadImage');

// ==========================================
//      File Upload Multer
// ==========================================
let storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const getPath = `${__dirname}/../../client/src/uploads`;

        fs.stat(`${getPath}/${year}`, (err, data) => {
            
            if (err){
                fs.mkdir(`${getPath}/${year}`, () => {
                    fs.mkdir(`${getPath}/${year}/${month}`, () => {
                        cb(null, `client/src/uploads/${year}/${month}/`)
                    });
                });
            } else {
                fs.stat(`${getPath}/${year}/${month}`, (err, data) => {
                    if (err){
                        fs.mkdir(`${getPath}/${year}/${month}`, () => {
                            cb(null, `client/src/uploads/${year}/${month}/`)
                        });
                    } else {
                        cb(null, `client/src/uploads/${year}/${month}/`)
                    }
                })
            }
        })
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
}).single('file')

router.post('/image', auth, (req, res) => {

    upload(req, res, (err) => {

        if (err) { return res.json({ success: false, err }) }

        const date = new Date();
        let upload_info = {
            'urlname': req.file.filename,
            'displayname': req.file.originalname,
            'type': req.file.mimetype,
            'size': req.file.size,
            'year': date.getFullYear(),
            'month': date.getMonth()
        }
        
        const image = new UploadImage(upload_info);
        image.save( (err, doc) => {

            if(err) return res.json({
                success: false,
                err
            });
            return res.status(200).json({
                success: true,
                doc
            })
        } )
        
    })
})



module.exports = router;