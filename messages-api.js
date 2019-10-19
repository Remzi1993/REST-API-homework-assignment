const Sequelize = require('sequelize');
const { Router } = require('express');
const db = require('./db')

const Message = db.define("message", {
    text: Sequelize.TEXT
});

const router = new Router();


router.post("/messages", (req, res, next) => {
    console.log("Text:", req.body.text)


    Message.create(req.body)
    res.json({
        "message": "Message received loud and clear"
    })


    // Message.findAll()
    // .then(movies => {
    //     console.log(movies);
        
    //     res.json(movies);
    // })
    // .catch(next);
});




// const rateLimiterMiddleware = (req, res, next) => {
//     rateLimiterRedis.consume(req.ip)
//        .then(() => {
//            next();
//        })
//        .catch(_ => {
//            res.status(429).send('Too Many Requests');
//        });
//     };
 
//  app.use(rateLimiterMiddleware);


module.exports = router