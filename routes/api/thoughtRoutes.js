const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought
} = require('../../controllers/thoughtController');


// /api/thoughts to GET all and POST new thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id to GET a single thought, UPDATE thought, and DELETE thought
router.route('/:id')
    .get(getSingleThought)
    .put(updateThought);

// /api/thoughts/:id/reactions to CREATE new reaction

// /api/thoughts/:id/reactions/:id to DELETE reaction

module.exports = router;