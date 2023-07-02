const { Schema, model, Types } = require('mongoose')
const emailValidator = require('../utils/emailValidator')

const authSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is require!'],
        min: 2,
        max: 30
    },
    url: String,
    role: {
        type: String,
        required: [true, 'Role is require!'],
        enum: ['Admin', 'User'],
        min: 2,
    },
    email: {
        type: String,
        required: [true, 'Email is require!'],
        lowercase: true,
        validate: {
            validator: (v) => emailValidator(v),
            message: props => `${props.value} is a invalid email`
        },
        trim: true
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    bio: String,
    address: String,
    website: String,
    github: String,
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],


}, { timestamps: true })

const Auth = model('Auth', authSchema)

module.exports = Auth;