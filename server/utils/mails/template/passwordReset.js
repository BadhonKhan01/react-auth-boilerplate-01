const config = require('./../../../config/config').get(process.env.NODE_ENV);

const resetPassword = data => {

    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:v="urn:schemas-microsoft-com:vml">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width" name="viewport" />
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible" />
        <!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
            }

            table,
            td,
            tr {
                vertical-align: top;
                border-collapse: collapse;
            }

            * {
                line-height: inherit;
            }

            a[x-apple-data-detectors=true] {
                color: inherit !important;
                text-decoration: none !important;
            }
        </style>
        <style id="media-query" type="text/css">
            @media (max-width: 520px) {

                .block-grid,
                .col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                }

                .block-grid {
                    width: 100% !important;
                }

                .col {
                    width: 100% !important;
                }

                .col>div {
                    margin: 0 auto;
                }

                img.fullwidth,
                img.fullwidthOnMobile {
                    max-width: 100% !important;
                }

                .no-stack .col {
                    min-width: 0 !important;
                    display: table-cell !important;
                }

                .no-stack.two-up .col {
                    width: 50% !important;
                }

                .no-stack .col.num4 {
                    width: 33% !important;
                }

                .no-stack .col.num8 {
                    width: 66% !important;
                }

                .no-stack .col.num4 {
                    width: 33% !important;
                }

                .no-stack .col.num3 {
                    width: 25% !important;
                }

                .no-stack .col.num6 {
                    width: 50% !important;
                }

                .no-stack .col.num9 {
                    width: 75% !important;
                }

                .video-block {
                    max-width: none !important;
                }

                .mobile_hide {
                    min-height: 0px;
                    max-height: 0px;
                    max-width: 0px;
                    display: none;
                    overflow: hidden;
                    font-size: 0px;
                }

                .desktop_hide {
                    display: block !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>

    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: transparent;">

        <table bgcolor="transparent" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
            style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent; width: 100%;"
            valign="top" width="100%">
            <tbody>
                <tr style="vertical-align: top;" valign="top">
                    <td style="word-break: break-word; vertical-align: top;" valign="top">
                        <div style="background-color:transparent;">
                            <div class="block-grid"
                                style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #1bb380;">
                                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#1bb380;">
                                    <div class="col num12"
                                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                                        <div style="width:100% !important;">
                                            <div
                                                style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:25px; padding-bottom:25px; padding-right: 0px; padding-left: 0px;">
                                                <div
                                                    style="color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                    <div
                                                        style="font-size: 14px; line-height: 1.2; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 17px;">
                                                        <p
                                                            style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px; margin: 0;">
                                                            <span style="color: #ffffff;"><strong><span
                                                                        style="font-size: 22px;">X-Blogger
                                                                        Logo</span></strong></span></p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="background-color:transparent;">
                            <div class="block-grid"
                                style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                                    <div class="col num12"
                                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                                        <div style="width:100% !important;">
                                            <div
                                                style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:20px; padding-bottom:20px; padding-right: 0px; padding-left: 0px;">
                                                <div
                                                    style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                    <div
                                                        style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 17px;">
                                                        <p
                                                            style="text-align: left; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;">
                                                            Someone has requested a password reset for the following
                                                            account:</p>
                                                        <p
                                                            style="text-align: left; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;">
                                                             </p>
                                                        <p
                                                            style="text-align: left; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;">
                                                            Username: ${data.username} </p>
                                                        <p
                                                            style="text-align: left; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;">
                                                             </p>
                                                        <p
                                                            style="text-align: left; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;">
                                                            If this was a mistake, just ignore this email and nothing will
                                                            happen.</p>
                                                        <p
                                                            style="text-align: left; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;">
                                                            To reset your password.</p>
                                                    </div>
                                                </div>
                                                <div align="center" class="button-container"
                                                    style="padding-top:20px;padding-right:10px;padding-bottom:20px;padding-left:10px;">
                                                    <a href="${config.ROOT_URL}/resetpassword/${data.resetToken}" target="_blank">
                                                        <div
                                                            style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#3AAEE0;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #3AAEE0;border-right:1px solid #3AAEE0;border-bottom:1px solid #3AAEE0;border-left:1px solid #3AAEE0;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;">
                                                            <span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;">
                                                                <span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px; ">
                                                                    <strong>Reset Password</strong>
                                                                </span>
                                                            </span>
                                                                
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="background-color:transparent;">
                            <div class="block-grid no-stack"
                                style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #1bb380;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color:#1bb380;background-image:;background-position:top left;background-repeat:no-repeat">
                                    <div class="col num12"
                                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                                        <div style="width:100% !important;">
                                            <div
                                                style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                                <div
                                                    style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                    <div
                                                        style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 17px;">
                                                        <p
                                                            style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;">
                                                            <span style="color: #ffffff;">All Rights Reserved By</span>
                                                            <strong><span
                                                                    style="color: #ffffff;">iambadhon.com</span></strong>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>

    </html>
    `
}
module.exports = { resetPassword }