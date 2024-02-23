const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const { comparePassword, hashPassword } = require('../config/authHelper');

function loginController(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    User.findOne({ email })
        .then(user => {
            comparePassword(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Invalid credentials' });
                    }
                    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).json({ message: 'Login successful' });
                }
                )
                .catch(err => res.status(500).json({ message: 'Server error' }));
        }
        )
        .catch(err => res.status(500).json({ message: 'Server error' }));
}

function registerController(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    hashPassword(password)
        .then(hashedPassword => {
            const user = new User({ email, password: hashedPassword });
            user.save()
                .then(() => res.status(201).json({ message: 'User created successfully' }))
                .catch(err => res.status(500).json({ message: 'Server error' }));
        }
        )
}

function logoutController(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = { loginController, registerController,logoutController };