
const { Schema, model } = require('mongoose');


const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },

}, { timestamps: true })


const Comment = model('Comment', commentSchema)
module.exports = Comment