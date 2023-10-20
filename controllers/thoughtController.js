const {User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getAllThoughts (req, res) {
        try {
            const thoughts = await Thought.find().populate('username');
            res.json(thoughts);
        } catch (err){
            console.log(err);
            return res.status(500).json (err);
        }
    },
    // get single thought
    async getSingleThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtID})
            .select('__v')
            .populate('username');

            if(!thought){
                return res.status(404).json({message: 'No thought with that Id' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err),
            res.status(500).json(err)
        }
    },
    // create thought post
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}
