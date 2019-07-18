const multer = require('multer');
const path = require('path');

//Set Storage Engine
const storage = multer.diskStorage({
    destination: 'views/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

//Filter Avatar File
const avatarFilter = (req, file, cb) => {
    const availableImageTypes = ['png', 'gif', 'jpeg', 'webp', 'svg+xml', 'x-icon'];
    const fileType = file.mimetype;

    if (contains(fileType, availableImageTypes)) {
        cb(null, true);
    } else {
        cb(new Error(`Файл должен быть только ${availableImageTypes} ептель`), false);
    }
};

//Init Upload Avatar
const uploadAvatar = multer({
    storage: storage,
    limits: {
        fileSize: 10485760,
    },
    fileFilter: avatarFilter,
}).single('inputAvatar');


function contains(target, pattern) {
    var value = 0;
    pattern.forEach(function (word) {
        value = value + target.includes(word);
    });
    return (value === 1)
}

module.exports = uploadAvatar;