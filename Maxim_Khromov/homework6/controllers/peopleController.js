 const request = require('request');
 const express = require('express');
 const router = express.Router();
 const mongoose = require('mongoose');
 const Person = mongoose.model('Person');

 router.get('/', (req, res) => {
     Person.find({
         isDeleted: false,
     }, (err, docs) => {
         if (!err) {
             res.render('./people/personList', {
                 title: 'People list',
                 people: docs,
             });
         } else {
             console.error(`Error in receiving people: ${err}`);
         }
     });
 });

 router.get('/add', (req, res) => {
     res.render('./people/personAddOrEdit', {
         title: 'a guy with a buttle in the ass',
     });
 });

 router.post('/add', (req, res, next) => {
     insertRecord(req, res);
     res.redirect('/people');
 });


 function insertRecord(req, res) {
     const person = new Person();
     person.firstName = req.body.firstName;
     person.secondName = req.body.secondName;
     person.patronymic = req.body.patronymic;
     person.description = req.body.description;
     person.save((err, doc) => {
         if (!err) {
             console.log(person);
         } else {
             console.error(err);
         }
     });
 }

 module.exports = router;