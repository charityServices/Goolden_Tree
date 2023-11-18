const express = require('express');
const router = express.Router()

const ContactUs = require('../Controllers/ContactUs-controller');

// router.post("/Signup", userController.registerUser);

// router.post("/Login", userController.loginUser);

router.post('/sendEmailContact', ContactUs.sendEmailContact);
//     ;
// router.post('/verificationCode', userController.verificationCode);

// router.put("/updatepassword", userController.updatepassword);

// router.get("/getUserData", userController.getUserData);

// router.get('/getUserId/:id', userController.getUserId);

// router.put('/updateUserData/:id', userController.updateUserData);

// router.put("/deleteUser/:id", userController.deleteUser);

module.exports = router;