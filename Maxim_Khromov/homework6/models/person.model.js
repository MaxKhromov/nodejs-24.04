const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
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

mongoose.model('Person', personSchema);