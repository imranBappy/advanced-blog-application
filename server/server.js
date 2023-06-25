const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandle = require('./middlewares/errorHandle');
const setRoutes = require('./routes');
const setMiddlewares = require('./middlewares');
const Formet = require('./utils/dataFormet');
const cors = require('cors')
const morgan = require('morgan')
// const cloudinary = require('cloudinary').v2;

const app = express();

dotenv.config({ path: './config/.env' })

// connect Database()
connectDB();


//static file
app.use(morgan('dev'))
app.use(express.static(__dirname + '\\public'))
app.use(cors());
//set middlewares
setMiddlewares(app)
// all routes set here
setRoutes(app)



// Return "https" URLs by setting secure: true
// cloudinary.config({
//     cloud_name: 'do5erbtee',
//     api_key: '155916269871985',
//     api_secret: 'z4TuFcGuRJvBs9d7crwxXGjFR0Q'
// });

// Log the configuration
// console.log(cloudinary.config());

// const filePath = "./imran.jpg";

// cloudinary.uploader.upload(filePath, ).then((result) => {
//     console.log(result);
// }).catch((error) => { console.log(error) });
// cloudinary.uploader.upload(filePath, { timeout: 100 }, function (error, result) {
//     console.log({ result, error });
// });

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' })
})

// handle Error
app.use(errorHandle)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})


