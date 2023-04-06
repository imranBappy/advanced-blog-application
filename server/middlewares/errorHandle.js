const errorHandle = (err, req, res, next) => {
    console.log(`Error: ${err.message}`);
    res.status(err.status).json({ error: err.message })
}

module.exports = errorHandle;