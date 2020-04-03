const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config').get(process.env.NODE_ENV);
require('dotenv').config();

// ===================================
//  Initial Package
// ===================================
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.DATABASE , {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'))


// ===================================
//  User Route
// ===================================
const user = require('./routes/user');
app.use('/api/users', user)

// ===================================
//  Media Route
// ===================================
const media = require('./routes/media');
app.use('/api/media', media)






// ===================================
//  Upload
// ===================================
const uploadImage = require('./routes/uploadImage');
app.use('/api/upload', uploadImage)

// ===================================
//  Default
// ===================================
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'build','index.html'));
    })
}
// ===================================
//  Server Connection
// ===================================
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server Runing at ${port}`)
})