const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    secondName: {
        type: String,
        default: 'Нет информации',
    },
    firstName: {
        type: String,
        default: 'Нет информации',
    },
    patronymic: {
        type: String,
        default: 'Нет информации',
    },
    description: {
        type: String,
        default: 'Нет информации',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

mongoose.model('Person', personSchema);