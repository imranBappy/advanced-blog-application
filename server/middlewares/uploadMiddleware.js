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
            return `${file.fieldname}-${Date.now()}-${file.originalname}.jpeg`
        },
    },
});

module.exports = multer({ storage: storage });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {

//         cb(null, UPLOAD_FOLDER)
//     },
//     filename: (req, file, cb) => {
//         const exName = path.extname(file.originalname);
//         const fileName = file.originalname
//             .replace(exName, '')
//             .toLowerCase()
//             .split(" ")
//             .join('-') + Date.now();
//         cb(null, fileName + exName);
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: (1024 * 1024) * 10 // mb
//     },
//     fileFilter: (req, file, cb) => {
//         if (
//             file.mimetype === 'image/png' ||
//             file.mimetype === 'image/jpeg' ||
//             file.mimetype === 'image/jpg' ||
//             file.mimetype === 'application/pdf'
//         ) {
//             cb(null, true)
//             // const filePath = __dirname + "\\public\\uploads\\" + file.originalname;
//             // const filePath = "D:/web/blog-assessment/server/public/uploads/" + file.originalname;
//             // uploadImage(filePath);
//         } else {
//             cb(new Error("Only .jpeg, .jpg, .png, .pdf formet allowed!"))
//         }
//     }
// })

// module.exports = upload;