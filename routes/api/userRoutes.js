const router = require('express').Router();

const {
    getAllUser,
    createUser,
    getUserById,
    updateUser
} = require('../../controllers/user-controllers');

//  at /api/users, GET all users & POST new user 
router.route('/')
    .get(getAllUser)
    .post(createUser);


// at /api/users/:id to GET  a single user, UPDATE user, or DELETE user 
router.route('/:id')
    .get(getUserById)
    .put(updateUser);

// post a new user 

// put to update a user by its id 

// delete to remove user by its id 

module.exports = router;

