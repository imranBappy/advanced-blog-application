const Auth = require('../models/Auth')
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')

const truncate = require('../utils/truncate')


// blog post controller


// blog get controller

exports.adminBlogsGetController = async (req, res, next) => {
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 10
    // let { order, filterObj } = generateFilterObb(filter.toLowerCase())
    let order = 1;
    try {
        let blogs = await Blog.find({})
            .populate('author', '_id name url')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        blogs = blogs.map(blog => ({
            ...blog._doc,
            content: truncate(blog._doc.content)
        }))
        res.json(blogs)

    } catch (error) {
        next(error)
    }
}

exports.blogGetController = async (req, res, next) => {
    const { blogId } = req.params
    try {
        let blog = await Blog.findById(blogId)
            .populate({
                path: 'comments',
                select: 'body createdAt',
                populate: {
                    path: 'user',
                    select: 'name url'
                }
            })
        res.json(blog)
    } catch (error) {
        next(error)
    }
}

exports.blogPatchController = async (req, res, next) => {
    const { blogId } = req.params
    const { title, content } = req.body
    try {
        let blog = await Blog.findByIdAndUpdate(blogId, {
            title: title,
            content: content
        })
        res.json(blog)
    } catch (error) {
        next(error)
    }
}

exports.blogDeleteController = async (req, res, next) => {
    const { blogId } = req.params
    try {
        let blog = await Blog.findOne({ author: req.user._id, _id: blogId })
        if (!blog) {
            let error = new Error('404 blog not found')
            error.status = 404
            throw error
        }
        await Blog.findOneAndDelete({ _id: blogId })
        await Auth.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { 'blogs': blogId } }
        )
        await Comment.deleteMany({
            blog: blog
        })
        res.json({
            message: "Blog Successfully deleted!"
        })
    } catch (error) {
        next(error)
    }
}