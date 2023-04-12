const Auth = require('../models/Auth');
const Blog = require('../models/Blog')


exports.dashboardBlogsGetController = async (req, res, next) => {
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 10
    let order = 1;
    if (!req.user._id) {
        let error = new Error('User Unauthenticated')
        error.status = 404
        throw error
    }
    try {
        const user = await Auth.findById(req.user._id)
        if (!user) {
            let error = new Error('User Unauthenticated')
            error.status = 404
            throw error
        }

        let blogs = await Blog.find(user.role === 'Admin' ? {} : { author: req.user._id })
            .select('title createdAt')
            .populate('author', '_id name url')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.json(blogs)

    } catch (error) {
        next(error)
    }
}

