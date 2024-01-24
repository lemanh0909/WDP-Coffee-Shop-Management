// ** Models

import User from "../models/user.js";
import Account from "../models/account.js";
import Shop from "../models/shop.js";


// ** Service
import { jwtService } from "../utils/jwt.js";

// ** Third Libs
import bcrypt from "bcrypt";
import crypto from "crypto";

// ** Constants

import { authConstant } from "../constant/index.js";


// import { transporter } from "../config/nodemailer";

export const authService = {
    createUser: async ({ email, password, fullName, dob, phoneNumber, role, shopName, managerEmail }) => {

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) throw new Error(authConstant.EMAIL_EXISTED);
    const generateRandomCode = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    };
    const verificationCode = generateRandomCode();
    const newAccount = new Account({
      email,
      password,
      verificationCode,
      isVerified: false,
    });
    const salt = bcrypt.genSaltSync();
    newAccount.password = bcrypt.hashSync(newAccount.password, salt);


    // const userJson = user.toJSON();

    // delete userJson.password;
    // delete userJson.refreshToken;

    var isVerified;
    if (role == "Manager") {
      isVerified = true;
    } else {
      isVerified = false;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("Email already exists in User table.");
    }


    const newUser = new User({
      _id: newAccount._id, // Mối quan hệ giữa User và Account thông qua userId
      fullName,
      dob,
      phoneNumber,
      description: "",
      salary: 0,
      isVerified,
      role,
    });

    await newAccount.save();
    await newUser.save();
    // console.log(newUser);
    if (role == "Manager") {
      const newShop = new Shop({
        shopName,
        managerId: newAccount._id,
      });
      await newShop.save();
    }else{
      const registerShopManager = await Account.findOne({ email: managerEmail });
      const registerShop = await Shop.findOne({ managerId: registerShopManager._id });
      if(!registerShop) throw new Error('Shop manager email not found');
      registerShop.staffId.push(newAccount._id);
      await registerShop.save();
    }
    return newAccount;
  },
  login: async ({ email, password }) => {
    const user = await User.findOne(
      { email },
    );

    if (!user) throw new Error(authConstant.EMAIL_NOT_EXIST);

    const passwordOk = bcrypt.compareSync(password, user.password);

    if (!passwordOk) throw new Error(authConstant.PASSWORD_INVALID);

    const payload = { id: user.id, fullName: user.fullName, role: user.role };
    const { accessToken, refreshToken } = await jwtService.getTokens(payload);

    user.refreshToken = refreshToken;
    await user.save();

    const userJson = user.toJSON();

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
  
};
