
const { Schema, model } = require('mongoose');


const blogSchema = new Schema({
    title: {
        type: String,
        min: 2,
        require: true
    },
    thumbnail: String,
    content: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Auth'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

}, { timestamps: true })

blogSchema.index({
    title: 'text',
    body: 'text',
    author: 'text'
})

const Blog = model('Blog', blogSchema)
module.exports = Blog