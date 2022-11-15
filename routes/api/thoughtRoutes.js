const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


// /api/thoughts to GET all and POST new thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id to GET a single thought, UPDATE thought, and DELETE thought
router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:id/reactions to CREATE new reaction
router.route('/:id/reactions')
    .post(createReaction);

// /api/thoughts/:id/reactions/:id to DELETE reaction
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;