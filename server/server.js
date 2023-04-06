const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandle = require('./middlewares/errorHandle');
const setRoutes = require('./routes');
const setMiddlewares = require('./middlewares');
const Formet = require('./utils/dataFormet');
const cors = require('cors')
const morgan = require('morgan')

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

app.get('/', (req, res) => res.send("Hello World"))


// handle 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' })
})

// handle Error
app.use(errorHandle)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})


