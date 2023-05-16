const userCollection = require('../models/userModel');
const freelancerCollection = require('../models/freelancerModel');
const companyCollection = require('../models/companyModel');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpCollection = require('../models/otpModel');

// signup

async function signupController(req, res) {
  try {
    const userData = new userCollection({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone
    });

    const user = await userData.save();
    jwt.sign({ user }, secret, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

// login

const loginController = async (req, res) => {
  try {
    const phone = req.body.phone;
    const type = req.body.type;
    let user;
    if(type === 'user')
    user = await userCollection.findOne({ phone: phone });
    else if(type === 'freelancer')
    user = await freelancerCollection.findOne({ phone: phone });
    else if(type === 'company')
    user = await companyCollection.findOne({phone : phone});

    if (!user) {
      return res.sendStatus(403);
    }

    const existingOtpData = await otpCollection.findOne({ phone: phone });

    if (existingOtpData) {
      await otpCollection.deleteOne({ phone: phone });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    const otpData = new otpCollection({
      phone: phone,
      otp: code,
      type: type
    });

    await otpData.save();

    sendTextMessage(phone, `Hi ${code} is your one time password to login on Fipezo. Do not share this with anyone. -Team Fipezo`);

    setTimeout(async () => {
      try {
        await otpCollection.deleteOne({ phone: phone });
      } catch (error) {
        console.error('Error deleting OTP:', error);
      }
    }, 30000);

    res.status(200).json({ phone: phone , type: type });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

//OTP

function sendTextMessage(phoneNumber, message) {
  // phoneNumber = "+91" + phoneNumber.toString();
  // twilio.messages.create({
  //   body: message,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phoneNumber
  // }).then((message) => console.log(message.sid));
}

const otpController = async (req, res) => {
  try {
    const otp = req.body.otp;
    const otpData = await otpCollection.findOne({ otp: otp, phone: req.body.phone , type: req.body.type });
    let user
    if(req.body.type === 'user')
    user = await userCollection.findOne({ phone: req.body.phone })
    else if(req.body.type === 'freelancer')
    user = await freelancerCollection.findOne({ phone: req.body.phone })
    else if(req.body.type === 'company')
    user = await companyCollection.findOne({ phone: req.body.phone })

    if (!user || !otpData) {
      return res.sendStatus(403);
    }

    console.log(otpData.otp, " ", otp);

    if (otpData.otp !== otp) {
      jwt.sign({ user }, secret, { expiresIn: '30d' }, (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        res.json({ token });
      });
    }
    else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  signupController,
  loginController,
  otpController
};