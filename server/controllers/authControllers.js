const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sentEmail");
var jwt = require('jsonwebtoken');

exports.authGetController = async (req, res, next) => {
    try {
        const user = await Auth.findById(req.query.id)
            .select('-password')
        if (user) {
            res.json({
                isAuthintication: true,
                data: user
            })
        } else {
            res.json({
                isAuthintication: false,
                message: 'User not found!',
                error: true
            })
        }

    } catch (error) {
        next(error)
    }
}
exports.signupController = async (req, res, next) => {
    try {
        let { name, email, password, role } = req.body;

        const user = await Auth.findOne({ email: email })
        if (user) {
            return res.status(500).json({ message: 'User Already Exist!' })
        }
        if (password.length < 6) return res.json({ message: 'Min length 6' });
        password = await bcrypt.hash(password, 10);
        const newUser = new Auth({ name, email, password, role, blogs: [] })
        await newUser.save();
        sendEmail(email, name)
        const token = jwt.sign({
            data: { _id: newUser._id, name: newUser.name, url: newUser.url }
        }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({
            isAuthintication: true,
            data: newUser,
            accessToken: token
        })
    }
    catch (error) {
        console.log({ error });
        next(error)
    }
}

exports.singinPostController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const std = await Auth.findOne({ email: email });
        if (!std) {
            return res.status(404).json({
                isAuthintication: false,
                message: "Account is not exit"
            })
        }
        const match = await bcrypt.compare(password, std.password);
        delete std.password;
        if (!match) {
            return res.json({
                isAuthintication: false,
                message: "Password is waring"
            })
        }

        const token = jwt.sign({
            data: { _id: std._id, name: std.name, url: std.url }
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            isAuthintication: true,
            data: std,
            accessToken: token
        })
    }

    catch (error) {
        console.log({ error });
        next(error)
    }
}

exports.updateController = async (req, res, next) => {
    try {
        const { name, email, password, bio, address, website, github } = req.body;
        const user = await Auth.findById(req.user._id);
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;
            user.bio = bio || user.bio;
            user.address = address || user.address;
            user.website = website || user.website;
            user.github = github || user.github;
            user.url = req?.file?.path || user.url;
            await user.save();
            res.json(user)
        } else {
            res.json({
                isAuthintication: false,
                message: 'User not found!',
                error: true
            })
        }
    }
    catch (error) {
        next(error)
    }
}

exports.resetController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

    }
    catch (error) {
        next(error)
    }
}
