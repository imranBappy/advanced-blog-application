const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'do5erbtee',
    api_key: '155916269871985',
    api_secret: 'z4TuFcGuRJvBs9d7crwxXGjFR0Q'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'thumbnail',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],

        format: async (req, file,) => {
            if (!file || !file.mimetype.startsWith('image/')) {
                return new Error('Only image files are allowed!');
            }
            return 'jpeg';
        }, // supports promises as well
        public_id: (req, file) => {
            const fileName = `${file.fieldname}-${Date.now()}-${file.originalname.split('.').slice(0, -1).join('-').split(' ').join('-')}`
            console.log(fileName);
            return fileName
        },
    },
});

module.exports = multer({ storage: storage });
