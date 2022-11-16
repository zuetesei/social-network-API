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
    },
    // delete user by id 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'UHOH! ❌ No user found with that id!' });
                }

                // BONUS: delete associated thoughts 
                return Thought.deleteMany({ _id: { $in: userData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and associate thoughts deleted. Goodbye!' });
            })
            .catch(err => res.status(400).json(err));
    },
    // add friend to user friend list 
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((friendData) => {
                if (!friendData) {
                    res.status(404).json({ message: 'UHOH! ❌ No user found with that id!' });
                } else {
                    res.status(200)({
                        message: 'Friend list updated!',
                        user: friendData,
                    });
                }
            })
            .catch(err => res.status(400).json(err));
    },
    // delete friend from user friend list 
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'UHOH! ❌ No user found with that id!' });
                } else {
                    res.status(200)({
                        message: 'Friend list updated!',
                        user: friendData,
                    });
                }
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    }
}




