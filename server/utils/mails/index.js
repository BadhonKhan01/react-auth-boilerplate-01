const mailer = require('nodemailer');

// ===================================
// Load Config
// ===================================
const config = require('./../../config/config').get(process.env.NODE_ENV);

// ===================================
// Load Email Template
// ===================================
const { resetPassword } = require('./template/passwordReset');


const getEmailData = (to, name, type, actionData) => {

    let data = null;

    switch (type) {
        case 'resetpass':

                data = {
                    from: '"React Auth " <reactauth@iambadhon.com>',
                    to,
                    subject: `${name} Password Reset`,
                    html: resetPassword(actionData)
                }

            break;
    
        default:
                data;
            break;
    }
    
    return data;
}


const sendEmail = (to, name, type, actionData = null) => {

    const smtpTransporter = mailer.createTransport({
        host: 'server.hostlinkbd.com',
        port: 587,
        secure: false,
        auth: {
            user: 'reactauth@iambadhon.com',
            pass: '3Qu_2v*M?5_L'
        }
    })

    const mail = getEmailData(to, name, type, actionData );

    smtpTransporter.sendMail(mail, function(error, response){
        if(error){
            console.log(error)
            cb(error);
        }else{  
            console.log(response)
            cb();
        }
    
        smtpTransporter.close();
    });
}

module.exports = { sendEmail }