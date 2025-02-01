var nodemailer = require('nodemailer');
const EmailTemplateModel = require('../Schema/EmailTemplateSchema');
require('dotenv').config();
EmailTemplateModel
const transporter = nodemailer.createTransport({
    port: 465,  // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
});
module.exports = {
    successResponse: async (res, message, data) => {
        return res.status(200).send({
            status: true,
            message,
            data
        });
    },
    failedResponse: async (res, message, data) => {
        return res.status(400).send({
            status: false,
            message,
            data
        });
    },
    serverErrorResponse: async (res, message, data) => {
        return res.status(500).send({
            status: false,
            message: message || "Internal Server Error",
            data
        });
    },
    noRecordFoundResponse: async (res, message, data) => {
        return res.status(200).send({
            status: false,
            message: message || "No Record Found",
            data
        });
    },
    alreadyExistsResponse: async (res, message, data) => {
        return res.status(200).send({
            status: false,
            message,
            data
        });
    },
    sendmails: async (to_email, email_template_code, other_data) => {
        try {
            const emailTemplateDetail = await EmailTemplateModel.findOne({slug:email_template_code});
            let html = "";
            let subject = "";
            // Define the full-page email design
        const commonTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: 'Arial', sans-serif;
                        background-color: #003300; /* Dark Green Background */
                        color: #ffffff;
                        text-align: center;
                    }
                    .container {
                        width: 100%;
                        max-width: 800px;
                        margin: 0 auto;
                        background: #ffffff;
                        color: #333;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                        box-sizing: border-box;
                    }
                    .header {
                        background: #002d00; /* Darker Green Header */
                        color: #ffffff;
                        padding: 20px;
                        border-radius: 8px 8px 0 0;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                        color: #f0f0f0;
                    }
                    .content {
                        padding: 20px;
                        font-size: 16px;
                    }
                    .footer {
                        background: #002d00; /* Even Darker Green Footer */
                        color: #f1f1f1;
                        padding: 10px;
                        font-size: 12px;
                        border-radius: 0 0 8px 8px;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 24px;
                        font-size: 16px;
                        color: #ffffff;
                        background: #009900; /* Bright Green Button */
                        text-decoration: none;
                        border-radius: 4px;
                        text-align: center;
                        margin-top: 20px;
                    }
                    .button:hover {
                        background: #007700; /* Darker Green Button on Hover */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>${emailTemplateDetail.title}</h1>
                    </div>
                    <div class="content">
                        {{content}}
                    </div>
                    <div class="footer">
                        <p>© 2024 Turtle Star. All rights reserved.</p>
                        <p><a href="#" class="button">Unsubscribe</a></p>
                    </div>
                </div>
            </body>
            </html>
        `;
        if (email_template_code === 'subadmin-create') {
            subject = emailTemplateDetail.title
            html = emailTemplateDetail.body_content
            html = html.replace("{{full_name}}", other_data.first_name == null || other_data.first_name.length == 0 ? '' : other_data.first_name);
            html = html.replace("{{email}}", other_data.email == null || other_data.email.length == 0 ? '' : other_data.email);
            html = html.replace("{{password}}", other_data.password == null || other_data.password.length == 0 ? '' : other_data.password);
        }
        const mailData = {
            from: `"Ecommerce" <${process.env.MAIL_ID}>`, // sender address
            to: to_email,   // list of receivers
            subject: subject,
            html: html
        };
        const info = await transporter.sendMail(mailData);
        if (info.accepted && info.accepted.length > 0) {
            console.log("Mail sent successfully to:", info.accepted);
            return { status: true, message: info };
        }
        else {
            return { status: false, message: "Mail Send Failed" };

        }    
        } catch (error) {
            return { status: false, message: err.message };

        }
        
    }
}
