const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
    },
    firstName: {
        type: String,
        default: 'Анонимус'
    },
    patronymic: {
        type: String,
    },
    avatar: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: 'Нет информации',
    },
    initials: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

mongoose.model('User', userSchema);