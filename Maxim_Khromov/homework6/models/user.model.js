const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        default: 'Нет информации',
    },
    password: {
        type: String,
        required: true,
        default: 'Нет информации',
    },
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

mongoose.model('User', userSchema);