const router = require('express').Router;

const {
    getAllUser,
    createUser
} = require('../../controllers/user-controllers');

// Set up GET all and POST at /api/users
router.route('/')
    .get(getAllUser)
    .post(createUser);


// get a single user by its id

// post a new user 

// put to update a user by its id 

// delete to remove user by its id 

module.exports = router;

