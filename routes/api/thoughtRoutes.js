const router = require('express').Router();

const {
    getAllThoughts,
    createThought
} = require('../../controllers/thoughtController');


// /api/thoughts to GET all and POST new thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// get a single thought by its id 

// post a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// put to update a thought by its id 

// delete to remove a thought by its id 

module.exports = router;