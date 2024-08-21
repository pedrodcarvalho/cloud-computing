require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Register Route
router.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.email,
        password: req.body.password
    });
    console.log(newUser);
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(200).json({ message: 'User registered successfully' });
    });
});

// Login Route
router.post('/login', passport.authenticate('local'), (req, res) => {
    const { remember } = req.body;
    req.session.cookie.maxAge = remember ? 30 * 24 * 60 * 60 * 1000 : null;

    const token = jwt.sign({ data: req.user }, process.env.JWT_SECRET);
    res.status(200).json({ token: token });
});

module.exports = router;
