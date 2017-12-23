const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/User');

const router = express.Router();
const secretKey = "}ugE|zhBf;}v-88b$f*k+<)rmwsU#`4y?$mSw.Bx?dG2S w|n4lWC8DP|e-;pnge"; // TODO: Change this.
const saltRounds = 10;

const EMAIL_TAKEN_ERROR = 0;
const INCORRECT_LOGIN_DETAILS_ERROR = 1;

// TODO: Add more parameters your app needs during registration.
router.get('/register/:email/:password/:name', function (req, res) {
    userSchema.find({email: req.params.email}, function (err, user) {
        if (!user) {
            createAccount();
        } else {
            res.json({error: EMAIL_TAKEN_ERROR});
        }
    });

    function createAccount() {
        bcrypt.hash(req.params.password, saltRounds, function (err, hash) {
            let user = new userSchema({
                email: req.params.email,
                name: req.params.name,
                password: hash,
            });

            user.token = jwt.sign({userId: user.id}, secretKey, {expiresIn: "365 days"});

            user.save(function () {
                res.json(loginResponse(user));
            })
        });
    }
});

router.get('/login/:email/:password', function (req, res) {
    userSchema.find({email: req.params.email}, function (err, user) {
        if (user) {
            logUserIn();
        } else {
            res.json({error: INCORRECT_LOGIN_DETAILS_ERROR});
        }
    });

    function logUserIn() {
        bcrypt.compare(req.params.password, user.password, function (err, res) {
            if (res == true) {
                res.json(loginResponse(user))
            } else {
                res.json({error: INCORRECT_LOGIN_DETAILS_ERROR})
            }
        });
    }
});

function loginResponse(user) {
    return {
        token: user.token,
        email: user.email,
        name: user.name
    }
}

module.exports = router;