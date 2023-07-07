const Auth = require('../models/Auth')
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')

const truncate = require('../utils/truncate')

// blog post controller
exports.blogPostController = async (req, res, next) => {
    let { title, content } = req.body
    let blog = new Blog({
        title,
        content,
        author: req.user._id,
        thumbnail: req.file ? `${req.file?.path}` : "",
        likes: [],
    })
    try {
        let createdBlog = await blog.save()
        await Auth.findOneAndUpdate(
            { user: req.user._id },
            { $push: { 'blogs': createdBlog._id } }
        )
        res.json({
            author: {
                _id: req.user._id,
                name: req.user.name,
                url: req.user.url
            },
            content: truncate(blog._doc.content),
            _id: blog._doc._id,
            title: blog._doc.title,
            thumbnail: blog._doc.thumbnail,
            createdAt: blog._doc.createdAt,
            likes: [],
            comments: [],
            createdAt: blog._doc.createdAt,
        })
    } catch (e) {
        next(e)
    }
}

// blog get controller

exports.blogsGetController = async (req, res, next) => {
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 10
    // let { order, filterObj } = generateFilterObb(filter.toLowerCase())
    let order = 1;
    try {
        let dataLength = await Blog.find({})
        let blogs = await Blog.find({})
            .select('-__v -updatedAt')
            .populate('author', '_id name url')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)
        blogs = blogs.map(blog => ({
            ...blog._doc,
            content: truncate(blog._doc.content)
        }))
        res.json({ blogs, length: dataLength.length })
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
                options: { sort: { createdAt: -1 } },
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
        let blog = await Blog.findById(blogId);
        if (!blog) {
            let error = new Error('404 blog not found')
            error.status = 404
            throw error
        }
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.thumbnail = req.file?.path || blog.thumbnail;
        await blog.save();
        res.json({
            author: {
                _id: req.user._id,
                name: req.user.name,
                url: req.user.url
            },
            content: truncate(blog._doc.content),
            _id: blog._doc._id,
            title: blog._doc.title,
            thumbnail: blog._doc.thumbnail,
            createdAt: blog._doc.createdAt,
            likes: [],
            comments: [],
            createdAt: blog._doc.createdAt,
        })
    } catch (error) {
        next(error)
    }
}

exports.blogDeleteController = async (req, res, next) => {
    const { blogId } = req.params
    try {
        let blog = await Blog.findOne({ _id: blogId })
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
        res.json(blog)
    } catch (error) {
        next(error)
    }
}
