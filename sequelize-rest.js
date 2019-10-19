const Sequelize = require('sequelize');
const { Router } = require('express');
const db = require('./db')


const Movie = db.define("movie", {
    title: Sequelize.STRING,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.TEXT
});


const router = new Router();

// Create - POST should return a HTTP status 201 (Created) if correct/successful
// Create a new movie
router.post("/movies", (req, res, next) => {
    // console.log("req.body > ", req.body)

    Movie.create(req.body)
        .then(movie => res.status(201).json(movie))
        .catch(next)
});

// Read - GET should return a HTTP status 200 (OK) if correct/successful - GET and 200 are default
// Return all movies
router.get('/movies', (req, res, next) => {
    Movie.findAll()
        .then(movies => {
            res.json(movies);
        })
        .catch(next);
});

router.get('/movies/:movieId', (req, res, next) => {
    Movie.findByPk(req.params.movieId)
        .then(movie => {
            res.json(movie);
        })
        .catch(next);
});

// Update/Modify - PATCH should return a HTTP status 200 (OK) or 204 (No Content) if correct/successful
// Update/modify a movie
router.patch("/movies/:movieId", (req, res, next) => {
    Movie.findByPk(req.params.movieId)
        .then(movie => {
            if (movie) {
                movie
                    .update(req.body)
                    .then(movie => res.status(204).json(movie));
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

router.put("/movies/:movieId", (req, res, next) => {
    Movie.findByPk(req.params.movieId)
        .then(movie => {
            if (movie) {
                movie
                    .update(req.body)
                    .then(movie => res.status(204).json(movie));
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

// Delete - DELETE should return a HTTP status 200 (OK) if something was successfully deleted
// Removes a movie
router.delete("/movies/:movieId", (req, res, next) => {
    console.log(req.params);
    // console.log('params', req.params)
    // res.send('The route works!')

    Movie.destroy({
            where: {
                id: req.params.movieId,
            }
        })
        .then(numDeleted => {
            if (numDeleted) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

module.exports = {
    Movie,
    router
}