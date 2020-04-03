const express = require('express');
const router = express.Router();
const path = require('path');

// ===================================
//  User Middleware
// ===================================
const { auth } = require('./../middleware/auth');
const { paginated } = require('./../middleware/paginated');
const { paginatedTrash } = require('./../middleware/paginatedTrash');

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
//  User Models
// ===================================
const { UploadImage } = require('./../models/uploadImage');


// =============================================================================
//      Get All Media
// =============================================================================
router.get('/getmedia', auth, paginated(UploadImage), (req, res) => {
    res.json(res.paginated)
})

// =============================================================================
//      Get All Trash Media Data
// =============================================================================
router.get('/getmedia_trash', auth, paginatedTrash(UploadImage), (req, res) => {
    res.json(res.paginated)
})

// =============================================================================
//      Display Image API
// =============================================================================
router.get('/image', auth, (req, res) => {
    let year = req.query.year;
    let month = req.query.month;
    let urlname = req.query.urlname;

    const dir = path.resolve(".")+`/client/src/uploads/${year}/${month}/${urlname}`;
    res.sendFile(dir);
})

// =============================================================================
//      Load More Image
// =============================================================================
router.get('/loadMoreImage', auth, (req, res) => {

    let limit = parseInt(req.query.limit);
    let skip = parseInt(req.query.skip);

    UploadImage.find().skip(skip).limit(limit).sort({_id:'desc'}).
    exec( (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

// ===================================
//  Temp Delete User 
// ===================================
router.delete( '/tempdelete', auth, ( req, res ) => {
    
    UploadImage.findByIdAndUpdate(
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

// ==========================================
//      Delete Media Image
// ==========================================
router.delete( '/delete', auth, ( req, res ) => {
    let id = req.query.id;

    UploadImage.findByIdAndRemove(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json(true)
    })

} )

// ===================================
//  Temp Multiple Media Delete
// ===================================
router.delete( '/temp_delete_media', auth, ( req, res ) => {
    const ids = req.query.ids;

    const getArrayIdes = ids.split(",");

    UploadImage.updateMany(
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
//  Multiple Media Delete
// ===================================
router.delete( '/delete_media', auth, ( req, res ) => {
    const ids = req.query.ids;

    const getArrayIdes = ids.split(",");
    UploadImage.remove({ _id : { $in: getArrayIdes } }, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json(true)
    })
} )


// ===================================
//  Search Media Image 
// ===================================
router.get('/search', auth, (req, res) => {
    let search = req.query.mediasearch;
    const searchText = new RegExp(search, 'i');
    UploadImage.find({ displayname: searchText }, (err, doc) => {
        return res.json({
            search: doc
        })
    })
})

// ===================================
//  Edit Single Media Data 
// ===================================
router.get('/edit', auth, (req, res) => {
    let id = req.query.id;

    UploadImage.findById({ _id: id })
    .exec( (err, doc)=>{
        if (err) return res.status(400).send(err);
        res.send(doc);
    } )
})

// ===================================
//  Update Single Media Data 
// ===================================
router.post('/update', auth, (req, res) => {
    UploadImage.findByIdAndUpdate(
        req.body._id,
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if(err) return res.status(400).send(err);

            return res.status(200).send({
                success: true
            })
        }
    )
})

// ===================================
//  Restore Media Item
// ===================================
router.get( '/restore', auth, ( req, res ) => {
    
    UploadImage.findByIdAndUpdate(
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

    UploadImage.updateMany(
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