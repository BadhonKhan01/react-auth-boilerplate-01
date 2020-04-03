const express = require('express');
const router = express.Router();
const moment = require("moment");

// ===================================
//  User Middleware
// ===================================
const { auth } = require('./../middleware/auth');
const { paginated } = require('./../middleware/paginated');
const { paginatedTrash } = require('./../middleware/paginatedTrash');
const { sendEmail } = require('./../utils/mails/index');

// ===================================
//  User Models
// ===================================
const { User } = require('./../models/user');

// ===================================
//  User Authentication Check
// ===================================
router.get('/auth', auth, (req, res) => {

    // console.log(req.user._id)

    User.findOne(
        { 
            'email': req.user.email
        },
        function (err, user) {
            res.status(200).json({
                isAuth: true,
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileimage: user.profileimage
            })
        }
    ).populate('profileimage')
})

// ===================================
//  Super Admin Config
// ===================================
router.post('/config', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({
            success: false,
            err
        })
        res.status(200).json({ success: true })
    })
})

// ===================================
//  User registration
// ===================================
router.post('/registration', auth, (req, res) => {
    const user = new User(req.body);
    
    user.save((err, doc) => {
        if (err) return res.json({
            success: false,
            err
        })

        res.status(200).json({
            success: true
        })
    })
})

// ===================================
//  User Login
// ===================================
router.post('/login', (req, res) => {
    User.findOne(
        { 
            'email': req.body.email
        },
        function (err, user) {

            if (!user || user.deleteItem === 1) return res.json({
                success: false,
                message: 'Login failed, email not found'
            })
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) return res.json({
                    success: false,
                    message: 'Login failed, wrong password'
                })

                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);

                    res.cookie('react_auth', user.token).status(200).json({
                        success: true
                    });
                })

            })
        }
    )
})

// ===================================
//  User Logout
// ===================================
router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if (err) return res.json({ success: false, err });

            return res.status(200).send({
                success: true
            })
        }
    )
})

// ===================================
//  User Reset Password
// ===================================
router.post('/resetpassword', (req, res) => {

    const today = moment().startOf('day').valueOf();
    
    User.findOne(
        {
            resetToken: req.body.resetToken,
            resetTokenExp: {
                $gte: today
            }
        },
        function (err, user) {
            if (err) return res.json({ success: false, err });

            if(!user) return res.json({
                success: false,
                message: 'Sorry, you reset password link not valid.'
            })

            user.password = req.body.password;
            user.resetToken = '';
            user.resetTokenExp = '';

            user.save( (err, doc) => {
                if (err) return res.json({ success: false, err });

                return res.status(200).json({
                    success: true
                })
            } )

        }
    )
})

// ===================================
//  User Email Check
// ===================================
router.post('/checkEmail', (req, res) => {
    User.findOne(
        { email: req.body.email },
        function (err, user) {
            if (!user) return res.json({
                success: false,
                message: 'Email not found'
            })
            
            user.generateResetToken( (err, user) => {
                if (err) return res.json({ success: false, err });
                
                // send email
                sendEmail(user.email, user.username, 'resetpass', user);

                return res.json({
                    success: true
                })
            } )
        }
    )
})

// ===================================
//  Get All Users
// ===================================
router.get('/getallusers', auth, paginated(User,'profileimage'), (req, res) => {
    res.json(res.paginated)
})

// ===================================
//      Get All Trash Users Data
// ===================================
router.get('/getuser_trash', auth, paginatedTrash(User,'profileimage'), (req, res) => {
    res.json(res.paginated)
})

// ===================================
//  Search User 
// ===================================
router.get('/search', auth, (req, res) => {
    let search = req.query.usersearch;
    const searchText = new RegExp(search, 'i');
    User.find({ username: searchText }, (err, doc) => {
        return res.json({
            search: doc
        })
    })
})

// ===================================
//  Single Users Edit
// ===================================
router.get('/edit', auth, (req, res) => {
    let id = req.query.id;

    User.findById({ _id: id })
    .populate('profileimage')
    .exec( (err, doc)=>{
        if (err) return res.status(400).send(err);
        res.send(doc);
    } )
})

// ===================================
//  Update User 
// ===================================
router.post('/update', auth, (req, res) => {
    User.findOne(
        {
            '_id': req.body._id
        },
        function (err, user) {
            user.username = req.body.username;
            user.age = req.body.age;
            user.gender = req.body.gender;
            user.phone = req.body.phone;
            user.address = req.body.address;
            user.email = req.body.email;
            user.role = req.body.role;
            user.post = req.body.post;
            user.status = req.body.status;
            user.profileimage = req.body.profileimage ? req.body.profileimage : null;
            if(req.body.password !== ''){
                user.password = req.body.password;
            }

            user.save((err, doc) => {
                if (err) return res.json({
                    success: false,
                    err
                })

                res.status(200).json({
                    success: true
                })
            })
        }
    )
})

// ===================================
//  Temp Delete User 
// ===================================
router.delete( '/tempdelete', auth, ( req, res ) => {
    
    User.findByIdAndUpdate(
        req.query.id,
        {
            "deleteItem": 1
        },
        { new: true },
        (err, doc) => {
            if(err) return res.status(400).send(err);

            return res.status(200).send({
                success: true
            })
        }
    )
} )

// ===================================
//  Delete User 
// ===================================
router.delete( '/delete', auth, ( req, res ) => {
    let id = req.query.id;
    User.findByIdAndRemove(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json(true)
    })
} )

// ===================================
//  Multiple User Delete
// ===================================
router.delete( '/delete_users', auth, ( req, res ) => {
    const ids = req.query.ids;

    const getArrayIdes = ids.split(",");
    User.remove({ _id : { $in: getArrayIdes } }, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json(true)
    })
} )


// ===================================
//  Temp Multiple Media Delete
// ===================================
router.delete( '/temp_delete_multi_user', auth, ( req, res ) => {
    const ids = req.query.ids;

    const getArrayIdes = ids.split(",");

    User.updateMany(
        { _id : { $in: getArrayIdes } }, 
        { $set:{ deleteItem: 1 } },
        { new: true },
        (err, doc) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                success: true
            })
        }
    )
} )

// ===================================
//  Selected Item Change Role
// ===================================
router.get( '/changerole', auth, ( req, res ) => {
    
    const role = req.query.role;
    const ids = req.query.ids;
    const getArrayIdes = ids.split(",");

    User.updateMany(
        { _id : { $in: getArrayIdes } }, 
        { $set:{ role: role } },
        { new: true },
        (err, doc) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                success: true
            })
        }
    )
} )

// ===================================
//  Restore Users
// ===================================
router.get( '/restore', auth, ( req, res ) => {
    
    User.findByIdAndUpdate(
        req.query.restoreId,
        {
            "deleteItem": 0
        },
        { new: true },
        (err, doc) => {
            if(err) return res.status(400).send(err);

            return res.status(200).send({
                success: true
            })
        }
    )
} )

// ===================================
//  Restore Multi Media Item
// ===================================
router.get( '/restore_multiItem', auth, ( req, res ) => {

    const ids = req.query.restoreIds;

    const getArrayIdes = ids.split(",");

    User.updateMany(
        { _id : { $in: getArrayIdes } }, 
        { $set:{ deleteItem: 0 } },
        { new: true },
        (err, doc) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                success: true
            })
        }
    )
} )




module.exports = router;