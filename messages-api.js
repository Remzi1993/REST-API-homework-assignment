const Sequelize = require('sequelize');
const { Router } = require('express');
const db = require('./db')

const Message = db.define("message", {
    text: Sequelize.TEXT
});

const router = new Router();

router.post("/messages", (req, res, next) => {
    console.log("Text:", req.body.text)
    if(req.body.text) {
        Message.create(req.body)

        Message.findAndCountAll()
        .then(messages => {
            if (messages.count < 5) {
                res.json({
                    "message": "Message received loud and clear"
                })
            }
            else {
                res.status(429).send('Too Many Requests');
            }        
        })

        .catch(next);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

module.exports = router