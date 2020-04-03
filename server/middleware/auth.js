const { User } = require('./../models/user');
const config = require('./../config/config').get(process.env.NODE_ENV);

let auth = (req, res, next) => {
    let token = req.cookies.react_auth;

    User.findByToken(token, (err, user)=>{
        if(err) throw err;

        if(config.ACCESS === 'superadmin'){
            if(!user) return res.json({
                config: config.ACCESS
            })
            next();
        }

        if(!user) return res.json({
            isAuth: false,
            error: true
        })

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }