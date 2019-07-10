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
        default: '',
    },
    firstName: {
        type: String,
        default: '',
    },
    patronymic: {
        type: String,
        default: '',
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