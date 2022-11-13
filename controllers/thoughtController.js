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
    }
}