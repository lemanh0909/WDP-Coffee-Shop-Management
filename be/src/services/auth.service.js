// ** Models

import User from "../models/user.js";
import Shop from "../models/shop.js";
import UserVerification from "../models/UserVerification.js";

// ** Service
import { jwtService } from "../utils/jwt.js";

// ** Third Libs
import bcrypt from "bcrypt";
import crypto from "crypto";

// ** Constants

import { authConstant } from "../constant/index.js";


// import { transporter } from "../config/nodemailer";

import { sendMail } from "../config/nodemailer";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";



export const authService = {
  createUser: async ({ email, password, fullName, dob, phoneNumber, shopName}) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error(authConstant.EMAIL_EXISTED);

    
    const newUser = await User.create({
      email,
      password,
      fullName,
      dob,
      phoneNumber,
      role: "Manager",
      description: "",
      salary: 0,
      
    });
    if (newUser) {
      //sendmail
      const url = "http://localhost:3000/verify/";
      const uniqueString = uuidv4() + newUser._id;
      const subject = "Verify your email";
      const html = `<body class="body" style="width:100%;height:100%;padding:0;Margin:0">
        <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA">
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
           <tr>
            <td valign="top" style="padding:0;Margin:0">
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
               <tr>
                <td class="es-info-area" align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                   <tr>
                    <td align="left" style="padding:20px;Margin:0">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" class="es-infoblock" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr>
                <td align="center" style="padding:0;Margin:0">
                 <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                   <tr>
                    <td align="left" style="Margin:0;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;font-size:0"><img src="https://ecmzsde.stripocdn.email/content/guids/CABINET_be108baa03a1d1a147086acbbe68bcf426c4e26d6a664accea0ead4f517380d1/images/capellahighresolutionlogotransparent_2.png" alt="" class="img-8654" width="152" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
               <tr>
                <td align="center" style="padding:0;Margin:0">
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                   <tr>
                    <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:30px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://ecmzsde.stripocdn.email/content/guids/CABINET_be108baa03a1d1a147086acbbe68bcf426c4e26d6a664accea0ead4f517380d1/images/verifyhighresolutionlogotransparent_1.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" class="img-9158" height="188"></td>
                           </tr>
                           <tr>
                            <td style="padding:0;Margin:0;font-family:verdana, geneva, sans-serif">
                             <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr class="links-images-top">
                                <td align="center" valign="top" width="33.33%" style="padding:0;Margin:0;border:0;padding-top:10px;padding-bottom:10px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:verdana, geneva, sans-serif;display:block;color:#096b81;font-size:14px"><img src="https://ecmzsde.stripocdn.email/content/guids/CABINET_be108baa03a1d1a147086acbbe68bcf426c4e26d6a664accea0ead4f517380d1/images/icons8protect48_1.png" title="Clarity" alt="Clarity" width="20" style="display:inline !important;font-size:14px;border:0;outline:none;text-decoration:none;vertical-align:middle;padding-bottom:5px"><br>Clarity</a></td>
                                <td align="center" valign="top" width="33.33%" style="padding:0;Margin:0;border:0;padding-top:10px;padding-bottom:10px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:verdana, geneva, sans-serif;display:block;color:#096b81;font-size:14px"><img src="https://ecmzsde.stripocdn.email/content/guids/CABINET_be108baa03a1d1a147086acbbe68bcf426c4e26d6a664accea0ead4f517380d1/images/icons8fast48_1_PCL.png" title="Convinient" alt="Convinient" width="20" style="display:inline !important;font-size:14px;border:0;outline:none;text-decoration:none;vertical-align:middle;padding-bottom:5px"><br>Convinient</a></td>
                                <td align="center" valign="top" width="33.33%" style="padding:0;Margin:0;border:0;padding-top:10px;padding-bottom:10px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:verdana, geneva, sans-serif;display:block;color:#096b81;font-size:14px"><img src="https://ecmzsde.stripocdn.email/content/guids/CABINET_be108baa03a1d1a147086acbbe68bcf426c4e26d6a664accea0ead4f517380d1/images/icons8hotel60_1.png" title="Destination" alt="Destination" width="20" style="display:inline !important;font-size:14px;border:0;outline:none;text-decoration:none;vertical-align:middle;padding-bottom:5px"><br>Destination</a></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px"><h1 style="Margin:0;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:46px !important;color:#096b81">Confirm Your Email</h1></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-bottom:5px;padding-top:5px;padding-right:40px;padding-left:40px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:5px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">If you did not register with us, please disregard this email.</p></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#08565c;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="${url + newUser._id + "/" + uniqueString
        }" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#08565c;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #08565c;border-left-width:30px;border-right-width:30px">CONFIRM YOUR EMAIL</a></span></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-bottom:5px;padding-top:5px;padding-right:40px;padding-left:40px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Once confirmed, this email will be uniquely associated with your account.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr>
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" role="none">
                   <tr>
                    <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;padding-bottom:20px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:600px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                             <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" valign="top" class="es-m-p0r" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://ecmzsde.stripocdn.email/content/assets/img/social-icons/logo-colored/facebook-logo-colored.png" alt="Fb" height="33" width="33" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                                <td align="center" valign="top" class="es-m-p0r" style="padding:0;Margin:0;padding-right:40px"><img title="Youtube" src="https://ecmzsde.stripocdn.email/content/assets/img/social-icons/logo-colored/youtube-logo-colored.png" alt="Yt" height="33" width="33" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                                <td align="center" valign="top" class="es-m-p0r" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://ecmzsde.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Ig" height="33" width="33" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                                <td align="center" valign="top" style="padding:0;Margin:0"><img title="TikTok" src="https://ecmzsde.stripocdn.email/content/assets/img/social-icons/logo-colored/tiktok-logo-colored.png" alt="Tt" height="33" width="33" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">Style Casual&nbsp;© 2021 Style Casual, Inc. All Rights Reserved.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898</p></td>
                           </tr>
                           <tr>
                            <td style="padding:0;Margin:0">
                             <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr class="links">
                                <td align="center" valign="top" width="33.33%" style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:5px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#2c2d2d;font-size:12px">Visit Us </a></td>
                                <td align="center" valign="top" width="33.33%" style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:5px;border-left:1px solid #cccccc"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#2c2d2d;font-size:12px">Privacy Policy</a></td>
                                <td align="center" valign="top" width="33.33%" style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-right:5px;padding-left:5px;border-left:1px solid #cccccc"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#2c2d2d;font-size:12px">Terms of Use</a></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
               <tr>
                <td class="es-info-area" align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                   <tr>
                    <td align="left" style="padding:20px;Margin:0">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" class="es-infoblock" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
        </div>
       </body>`;

      await sendMail({ email, subject, html });
      // return res.json({
      //   status: "Success",
      //   message: "Create user successfully!",
      //   data: newUser,
      // });
    }

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    

    await newUser.save();
    const newShop = new Shop({
      shopName,
      managerId: newUser._id,
    });
    await newShop.save();
    return newUser;
  },

  verify: async (req, res, next) => {
    try {
      const { id, uniqueString } = req.params;
      const uniqueStringhashed = await bcrypt.hash(uniqueString, 10);
      if (uniqueStringhashed) {
        const newUserVerify = await UserVerification.create({
          userId: id,
          uniqueString: uniqueStringhashed,
        });
        if (newUserVerify) {
          await User.updateOne({ _id: id }, { $set: { verificated: true } });
          const newUserVerify = await User.findById(id);
          return res.status(200).json({
            status : "Success",
            newUserVerify: newUserVerify
          });
        }
        
      }
      return res.json({ status: "FAILED", message: "Verify user Failed!" });
    } catch (err) {
      console.log(err);
    }
  },
  
  login: async ({ email, password }) => {
    const user = await User.findOne(
      { email },
    );

    if (!user) throw new Error(authConstant.EMAIL_NOT_EXIST);
    if (!user?.verificated == true) {
      throw new Error(authConstant.EMAILL_VERIFY)
    }
    if (user.status !== 'Active') {
      throw new Error(authConstant.ACCOUT_INACTIVE);
    }
    const passwordOk = bcrypt.compareSync(password, user.password);

    if (!passwordOk) throw new Error(authConstant.PASSWORD_INVALID);

    const payload = { id: user.id, fullName: user.fullName, role: user.role , verificated: user.verificated,};
    const { accessToken, refreshToken } = await jwtService.getTokens(payload);

    user.refreshToken = refreshToken;
    

    let userJson;

    if(user.role === "Admin") {userJson = user.toJSON();}
    else if(user.role === "Manager"){
      const shop = await Shop.findOne({ managerId: user._id });
      if (shop) {
        // Nếu user là Manager và được liên kết với một shop, thêm shopId vào user
        userJson = { ...user.toJSON(), shopId: shop._id };
      }
    }
   else if (user.role === "Staff") {
      const shop = await Shop.findOne({ staffId: user._id });
      if (shop) {
        // Nếu user là staff và được liên kết với một shop, thêm shopId vào user
        userJson = { ...user.toJSON(), shopId: shop._id };
        const manager = await User.findById(shop.managerId);
        if(manager.status == 'Inactive') throw new Error(authConstant.MANAGER_ACCOUT_INACTIVE);
      }
    }
    await user.save();

    delete userJson.password;
    delete userJson.refreshToken;

    return {
      user: userJson,
      accessToken,
      refreshToken,
    };
  },

  refreshToken: async ({ payload, refreshToken }) => {
    const user = await User.findById(payload.id);

    if (!user) throw new Error(userConstant.USER_NOT_EXIST);

    if (user.refreshToken !== refreshToken)
      throw new Error(authConstant.UNAUTHORIZED);

    const payloadParams = { ...payload };
    delete payloadParams.iat;
    delete payloadParams.exp;
    const { accessToken } = jwtService.getAccessToken(payloadParams);

    return {
      accessToken,
    };
  },
  changePassword: async ({ oldPassword, password, user }) => {
    const userUpdate = await User.findById(user.id);

    if (!bcrypt.compareSync(oldPassword, userUpdate.password))
      throw new Error(authConstant.OLD_PASSWORD_INVALID);

    const salt = bcrypt.genSaltSync();
    userUpdate.password = bcrypt.hashSync(password, salt);

    await userUpdate.save();

    const userJson = userUpdate.toJSON();

    delete userJson.password;
    delete userJson.refreshToken;

    return userJson;
  },
  verifyForgotPassword: async ({ email, req }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error(userConstant.USER_NOT_EXIST);

    const token = crypto.randomBytes(20).toString("hex");

    req.session[token] = email;

    const CLIENT_URL = process.env.CLIENT_URL;

    await transporter.sendMail({
      from: "BOT",
      to: email,
      subject: "Notification",
      html: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      <a href="${CLIENT_URL}/reset-password/${token}">reset password</a>\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    return true;
  },
  updatePassword: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error(userConstant.USER_NOT_EXIST);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return true;
  },
  sendMail: async ({ email, subject, content }) => {
    try {
      if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')
      const GOOGLE_MAILER_CLIENT_ID = '172753793288-9fvl46g7iriljqklo30nffda845jam13.apps.googleusercontent.com'
      const GOOGLE_MAILER_CLIENT_SECRET = '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'
      const GOOGLE_MAILER_REFRESH_TOKEN = '1//04scuQLhf9HxvCgYIARAAGAQSNwF-L9IrgyuduUKS0yqvV8Ohu2ANf1NBQxh8Wc7-dhgPXEMYOp1OPwgB-o6dlQ_4lWqk3p9GKB8'
      const ADMIN_EMAIL_ADDRESS = 'manhpro9900@gmail.com'
      // Khởi tạo OAuth2Client với Client ID và Client Secret 
      const myOAuth2Client = new OAuth2Client(
        GOOGLE_MAILER_CLIENT_ID,
        GOOGLE_MAILER_CLIENT_SECRET
      )
      // Set Refresh Token vào OAuth2Client Credentials
      myOAuth2Client.setCredentials({
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
      })
      /**
         * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
         * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
         */
      const myAccessTokenObject = await myOAuth2Client.getAccessToken()
      // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
      const myAccessToken = myAccessTokenObject?.token
      // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: ADMIN_EMAIL_ADDRESS,
          clientId: GOOGLE_MAILER_CLIENT_ID,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken
        }
      })
      // mailOption là những thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: subject, // Tiêu đề email
        html: `<h3>${content}</h3>` // Nội dung email
      }
      // Gọi hành động gửi email
      await transport.sendMail(mailOptions)
      // Không có lỗi gì thì trả về success
      return 'Email sent successfully.'
    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
      console.error(error)
      return { error: error.message }
    }
  },
};
