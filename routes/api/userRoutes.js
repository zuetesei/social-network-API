const router = require('express').Router();

const {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

//  at /api/users, GET all users & POST new user 
router.route('/')
    .get(getAllUser)
    .post(createUser);


// at /api/users/:id to GET  a single user, UPDATE user, or DELETE user 
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// at /api/users/:id/friends/:friendId, ADD friend and DELETE friend 
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;

