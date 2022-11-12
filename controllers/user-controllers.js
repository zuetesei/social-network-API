const { User, Thought } = require('../models');

module.exports = {
    // get all users 
    getAllUser(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create user 
    createUser({ body }, res) {
        User.create(body)
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log(err);
                return res.json(400).json(err)
            });
    },
    // get a single user by its id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((userData) => {
                if (!userData) {
                    res.stauts(404).json({ message: 'UHOH! No user found with that ID!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    // update user info by id 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'UHOH! ❌ No user found with that id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    }
}



    // delete to remove user by its id
    // deleteUser(req, res) {

    // },
    // post to add a new friend to a user's friend list
    // addFriend(req, res) {

    // },
    // removeFriend(req, res) {

    // }


