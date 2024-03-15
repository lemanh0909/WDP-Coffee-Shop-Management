// ** Models

import User from "../models/user.js";
import Shop from "../models/shop.js";


// ** Service
import { jwtService } from "../utils/jwt.js";

// ** Third Libs
import bcrypt from "bcrypt";
import crypto from "crypto";

// ** Constants

import { authConstant } from "../constant/index.js";


// import { transporter } from "../config/nodemailer";
import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'

export const authService = {
  createUser: async ({ email, password, fullName, dob, phoneNumber, shopName }) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error(authConstant.EMAIL_EXISTED);
    // const generateRandomCode = () => {
    //   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //   let code = "";
    //   for (let i = 0; i < 6; i++) {
    //     const randomIndex = Math.floor(Math.random() * characters.length);
    //     code += characters.charAt(randomIndex);
    //   }
    //   return code;
    // };
    // const verificationCode = generateRandomCode();
    const newUser = new User({
      email,
      password,
      fullName,
      dob,
      phoneNumber,
      role: "Manager",
      description: "",
      salary: 0,
    });
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   console.error("Email already exists in User table.");
    // }



    await newUser.save();
    const newShop = new Shop({
      shopName,
      managerId: newUser._id,
    });
    await newShop.save();
    return newUser;
  },
  login: async ({ email, password }) => {
    const user = await User.findOne(
      { email },
    );

    if (!user) throw new Error(authConstant.EMAIL_NOT_EXIST);
    if (user.status !== 'Active') {
      throw new Error(authConstant.ACCOUT_INACTIVE);
    }
    const passwordOk = bcrypt.compareSync(password, user.password);

    if (!passwordOk) throw new Error(authConstant.PASSWORD_INVALID);

    const payload = { id: user.id, fullName: user.fullName, role: user.role };
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
