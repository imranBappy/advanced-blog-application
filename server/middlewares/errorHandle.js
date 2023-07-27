const errorHandle = (err, req, res, next) => {
    console.log(222, err);
    res.status(err.status).json({ error: err.message })
}

module.exports = errorHandle;