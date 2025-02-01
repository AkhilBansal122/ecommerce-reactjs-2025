const mongoose = require('mongoose');
const EmailTemplateModel = require('../Schema/EmailTemplateSchema');


// Insert multiple permissions and assign them to the "Admin" role

module.exports={
     insertEmailTemplate : async () => {
        try {
            // Check if any email templates exist
            const getEmailTemplate = await EmailTemplateModel.find();
            
            // If no templates exist, insert predefined templates
            if (getEmailTemplate.length === 0) {
                const templates = [
                    {
                        slug: 'email-verification',
                        title: 'Email Verification',
                        body_content: '<table align="center" border="0" cellpadding="0" cellspacing="0" id="bodyTable" style="border-collapse: collapse; background-color: #F7F7F7; height: 100%; margin: 0; padding: 0; width: 100%;" width="100%"><tbody><tr><td align="center" id="bodyCell" style="border-top: 0; height: 100%; margin: 0; padding: 0; width: 100%;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; max-width: 900px; background: #F9F9F9; border: 0;" width="100%"><tbody><tr><td id="templatePreheader" style="background: #19395D; border-top: 0; border-bottom: 1px solid; padding: 10px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; min-width: 100%;" width="100%"><tbody><tr><td class="mcnTextContent" style="word-break: break-word; color: #fff; font-size: 30px; line-height: 150%; text-align: center; padding: 9px 18px;" valign="top">Registration</td></tr></tbody></table></td></tr><tr><td id="templateBody" style="background-color: #fff; border-bottom: 1px solid #D8D8D8; border-top: 1px solid #D8D8D8; padding: 30px 30px;" valign="top"><p>Hello,</p><p>You have been successfully registered. Please verify your email by entering this OTP - {{otp}}</p><p>Regards, Turtle Star</p></td></tr><tr><td id="templateFooter" style="background-color: #19395d85; padding: 25px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="text-align: center; color: #544F4F; font-size: 21px; font-weight: 500;">Turtle Star</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'
                    },
                    {
                        slug: 'reset-password',
                        title: 'Reset Password',
                        body_content: '<table align="center" border="0" cellpadding="0" cellspacing="0" id="bodyTable" style="border-collapse: collapse; background-color: #F7F7F7; height: 100%; margin: 0; padding: 0; width: 100%;" width="100%"><tbody><tr><td align="center" id="bodyCell" style="border-top: 0; height: 100%; margin: 0; padding: 0; width: 100%;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; max-width: 900px; background: #F9F9F9; border: 0;" width="100%"><tbody><tr><td id="templatePreheader" style="background: #19395D; border-top: 0; border-bottom: 1px solid; padding: 10px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; min-width: 100%;" width="100%"><tbody><tr><td class="mcnTextContent" style="word-break: break-word; color: #fff; font-size: 30px; line-height: 150%; text-align: center; padding: 9px 18px;" valign="top">Reset Password</td></tr></tbody></table></td></tr><tr><td id="templateBody" style="background-color: #fff; border-bottom: 1px solid #D8D8D8; border-top: 1px solid #D8D8D8; padding: 30px 30px;" valign="top"><p>Hello {{username}},</p><p>Please enter this OTP to reset your password.</p><p>OTP - {{otp}}</p><p>Regards, Turtle Star</p></td></tr><tr><td id="templateFooter" style="background-color: #19395d85; padding: 25px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="text-align: center; color: #544F4F; font-size: 21px; font-weight: 500;">Turtle Star</td></tr></tbody></table></td></tr></tbody></table>'
                    },
                    {
                        slug: 'subadmin-create',
                        title: 'Sub Admin Account',
                        body_content: '<table align="center" border="0" cellpadding="0" cellspacing="0" id="bodyTable" style="border-collapse: collapse; background-color: #F7F7F7; height: 100%; margin: 0; padding: 0; width: 100%;" width="100%"><tbody><tr><td align="center" id="bodyCell" style="border-top: 0; height: 100%; margin: 0; padding: 0; width: 100%;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; max-width: 900px; background: #F9F9F9; border: 0;" width="100%"><tbody><tr><td id="templatePreheader" style="background: #19395D; border-top: 0; border-bottom: 1px solid; padding: 10px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; min-width: 100%;" width="100%"><tbody><tr><td class="mcnTextContent" style="word-break: break-word; color: #fff; font-size: 30px; line-height: 150%; text-align: center; padding: 9px 18px;">Login Details</td></tr></tbody></table></td></tr><tr><td id="templateBody" style="background-color: #fff; border-bottom: 1px solid #D8D8D8; border-top: 1px solid #D8D8D8; padding: 30px 30px;" valign="top"><p>Hello {{full_name}},</p><p>Email - {{email}}</p><br/><p>Password :{{password}}</p><p>Regards, Turtle Star</p></td></tr><tr><td id="templateFooter" style="background-color: #19395d85; padding: 25px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="text-align: center; color: #544F4F; font-size: 21px; font-weight: 500;">Turtle Star</td></tr></tbody></table></td></tr></tbody></table>'
                    },
                    {
                        slug: "support-reply",
                        title: "Support Reply",
                        body_content: '<table align="center" border="0" cellpadding="0" cellspacing="0" id="bodyTable" style="border-collapse: collapse; background-color: #F7F7F7; height: 100%; margin: 0; padding: 0; width: 100%;" width="100%"><tbody><tr><td align="center" id="bodyCell" style="border-top: 0; height: 100%; margin: 0; padding: 0; width: 100%;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; max-width: 900px; background: #F9F9F9; border: 0;" width="100%"><tbody><tr><td id="templatePreheader" style="background: #19395D; border-top: 0; border-bottom: 1px solid; padding: 10px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; min-width: 100%;" width="100%"><tbody><tr><td class="mcnTextContent" style="word-break: break-word; color: #fff; font-size: 30px; line-height: 150%; text-align: center; padding: 9px 18px;">Support</td></tr></tbody></table></td></tr><tr><td id="templateBody" style="background-color: #fff; border-bottom: 1px solid #D8D8D8; border-top: 1px solid #D8D8D8; padding: 30px 30px;" valign="top"><p>Hello {{username}},</p><p>We have received your query. Your reply is: {{reply_message}}</p><p>Thank you, Turtle Star</p></td></tr><tr><td id="templateFooter" style="background-color: #19395d85; padding: 25px 0;" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="text-align: center; color: #544F4F; font-size: 21px; font-weight: 500;">Turtle Star</td></tr></tbody></table></td></tr></tbody></table>'
                    }
                ];
    
                // Insert templates into the database
                await EmailTemplateModel.insertMany(templates);
                console.log('Templates inserted');
            } else {
                console.log('Email templates already exist.');
            }
        } catch (error) {
            console.error('Error inserting email templates:', error);
        }
    }    
}