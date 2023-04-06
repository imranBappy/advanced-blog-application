const { Schema, model, Types } = require('mongoose')
const emailValidator = require('../utils/emailValidator')

const authSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is require!'],
        min: 2,
        max: 30
    },
    url: {
        type: String,
        default: 'https://imranbappy.me/_ipx/w_640,q_75/%2F_next%2Fstatic%2Fmedia%2Fimran-hosen.51750c04.png?url=%2F_next%2Fstatic%2Fmedia%2Fimran-hosen.51750c04.png&w=640&q=75',
    },
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
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],

}, { timestamps: true })

const Auth = model('Auth', authSchema)

module.exports = Auth;