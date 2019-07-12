 const express = require('express');
 const router = express.Router();
 const mongoose = require('mongoose');
 const User = mongoose.model('User');
 const bcrypt = require('bcryptjs');
 const passport = require('passport');

 router.get('/login', (req, res) => {
     res.render('./users/login', {
         title: 'Login',
     });
 });

 router.post('/login', (req, res, next) => {
     passport.authenticate('local', {
         successRedirect: '/people',
         failureRedirect: '/users/login',
         failureFlash: true,
     })(req, res, next);
 });

 router.get('/logout', (req, res) => {
     req.logout();
     req.flash('success_msg', 'You are loged out');
     res.redirect('/users/login');
 });

 router.get('/register', (req, res) => {
     res.render('./users/register', {
         title: 'Register',
     });
 });

 router.post('/register', (req, res) => {
     const {
         userName,
         password,
         confirmPassword,
         secondName,
         firstName,
         patronymic,
         description
     } = req.body;
     let errors = [];

     //check required field
     if (!userName || !password || !confirmPassword) {
         errors.push({
             msg: 'Please fill in all fields'
         });
     }

     //check passwords match
     if (password !== confirmPassword) {
         errors.push({
             msg: 'Passwords do not match'
         });
     }

     if (password.length < 6) {
         errors.push({
             msg: 'Password should be at least 6 characters long'
         });
     }
     //TODO: userName validation
     if (errors.length > 0) {
         res.render('./users/register', {
             title: 'Register',
             errors,
             userName,
             password,
             firstName,
             secondName,
             patronymic,
             description,
         });
     } else {
         // Validation passed
         User.findOne({
                 userName: userName
             })
             .then(user => {
                 if (user) {
                     // User exists
                     errors.push({
                         msg: 'User already exists'
                     });
                     res.render('./users/register', {
                         title: 'Register',
                         errors,
                         userName,
                         password,
                         firstName,
                         secondName,
                         patronymic,
                         description,
                     });
                 } else {
                     const newUser = new User({
                         userName,
                         password,
                         firstName,
                         secondName,
                         patronymic,
                         description,
                     });

                     //Hash password
                     bcrypt.genSalt(11, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                         if (err) throw err;
                         //Set password to hashed
                         newUser.password = hash;
                         //Save user
                         newUser.save()
                             .then(user => {
                                 req.flash('success_msg', 'Congratulations! You are now registered and can log in!');
                                 res.redirect('/users/login');
                             })
                             .catch(err => console.log(err));
                     }));
                 }
             });
     }
 });

 module.exports = router;