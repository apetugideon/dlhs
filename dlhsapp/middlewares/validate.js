"use strict";

const jwt = require('jsonwebtoken');
const config = require(__dirname + '../../config/config.json')["jwt"];

module.exports.validateUser = (req, res, next) => {
    if (req.headers['api-key']) {
        const token = req.headers['api-key'].split(" ")[1]; 
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({
                    "code": "AUT_02",
                    "message": "The apikey is invalid.",
                    "field": "API-KEY"
                })
            } else {
                req.body.user_id = decoded.id
                next()
            }
        })
    } else {
        res.json({
            code: "USR_02",
            message: "The authorization field is empty",
            field: "API-KEY"
        })
    }
}