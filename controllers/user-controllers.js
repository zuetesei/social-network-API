const { User, Thought } = require('../models');

module.exports = {
    // get all users 
    getAllUser(req, res) {
        User.find({})
        .then(User => res.json(User))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create user 
    createUser({body}, res) {
        User.create(body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.json(400).json(err)
        });
    }
}
    // get all users
    
    // get a single user by its id
    // getUserById({ params }, res) {
    //     User.findOne({ _id: params.id })
    //         .populate('thoughts')
    //         .populate('friends')
    //         .select('-__v')
    //         .then((user) => {
    //             if (!user) {
    //                 res.stauts(404).json({ message: 'No user found with this ID.' });
    //                 return;
    //             }
    //             res.json(user)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(400).json(err);
    //         });
    // },
    // post a new user 
    // createUser(req, res) {
    //     User.create(req.body)
    //         .then((user) => res.json(user))
    //         .catch((err) => {
    //             console.log(err);
    //             return res.status(500).json(err);
    //         });
    // },
    // put to update a user by its id 
    // updateUserById(req, res) {

    // },
    // delete to remove user by its id 
    // deleteUser(req, res) {

    // },
    // post to add a new friend to a user's friend list
    // addFriend(req, res) {

    // },
    // removeFriend(req, res) {

    // }


