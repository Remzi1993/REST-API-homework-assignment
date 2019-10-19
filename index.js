// Requires
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

// Middelwares
const bodyParserMiddleWare = bodyParser.json()
const corsMiddleWare = cors()

// Setup
const port = process.env.PORT || 3000;
const app = express();
const sequelizeRest = require('./sequelize-rest')
const messagesAPI = require('./messages-api')
const db = require('./db')

// If req.body is undefined
// - use bodyparser
// - make sure to app.use(bodyparser) before doing app.use(blablRouter)
// - order matters here (wtf?) -> probably for a good reason 

app
    .use(corsMiddleWare)
    .use(bodyParserMiddleWare)
    .use(sequelizeRest.router)
    .use(messagesAPI)
    .listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });

db
    .sync({
        force: true
    })
    .then(() => {
        const movies = [
            {
                title: "The Lion King",
                yearOfRelease: 2019,
                synopsis: "Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny on the plains of Africa. But not everyone in the kingdom celebrates the new cub's arrival. Scar, Mufasa's brother -- and former heir to the throne -- has plans of his own. The battle for Pride Rock is soon ravaged with betrayal, tragedy and drama, ultimately resulting in Simba's exile. Now, with help from a curious pair of newfound friends, Simba must figure out how to grow up and take back what is rightfully his."
            },
            {
                title: "The Angry Birds Movie 2",
                yearOfRelease: 2019,
                synopsis: "Red, Chuck, Bomb and the rest of their feathered friends are surprised when a green pig suggests that they put aside their differences and unite to fight a common threat. Aggressive birds from an island covered in ice are planning to use an elaborate weapon to destroy the fowl and swine way of life. After picking their best and brightest, the birds and pigs come up with a scheme to infiltrate the island, deactivate the device and return to their respective paradises intact."
            },
            {
                title: "Joker",
                yearOfRelease: 2019,
                synopsis: "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker."
            }
        ]

        const moviePromises = movies.map((movie) => sequelizeRest.Movie.create(movie))
        return Promise.all(moviePromises)
    })
    .catch(console.error);