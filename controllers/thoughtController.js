const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts 
    getAllThoughts(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(400).json(err));
    },
    //get single thought 
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then((thought) => res.json(thought))
            .catch((err) => res.status(400).json(err));
    },
    // create a thought, push to associated user's thought array
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'UHOH! ❌ No user found with that id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'UHOH! ❌ No thought found with that id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'UHOH! ❌ No thought found with that id!' });
                }
                return User.findOneAndDelete(
                    { _id: params.id },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'OOPS! ❌ No user found with that ID!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    // create reaction 
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'UHOH! ❌ No thought found with that id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true, runValidators: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No reaction with that id!' });
                }
                res.json(thought);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    }
};