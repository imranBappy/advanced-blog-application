const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name || 'do5erbtee',
    api_key: process.env.api_key || '155916269871985',
    api_secret: process.env.api_secret || 'z4TuFcGuRJvBs9d7crwxXGjFR0Q'
});
const deleteMedia = async (req, res, next) => {
    try {
        const { media_id } = req.body;
        if (media_id) {
            await cloudinary.uploader.destroy(media_id)
        }
        next();
    } catch (error) {
        console.log(error);
        error.status = 404;
        next(error)
    }
}
module.exports = deleteMedia;