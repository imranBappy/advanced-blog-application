const Blog = require("../models/Blog")
const Comment = require("../models/Comment")


exports.commentsPostController = async (req, res) => {
    const { blogId } = req.params
    const { body } = req.body
    if (!req.user) {
        return res.status(403).json({ message: 'Your are not an authenticated user' })
    }
    let comment = new Comment({
        blog: blogId,
        user: req.user._id,
        body,
    })
    try {
        let createdComment = await comment.save()
        await Blog.findOneAndUpdate(
            { _id: blogId },
            { $push: { 'comments': createdComment._id } }
        )
        let commentJson = await Comment.findById(createdComment._id).populate({
            path: 'user',
            select: 'url name'
        })
        return res.status(201).json(commentJson)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Server site error'
        })
    }
}

