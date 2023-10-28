const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getAllThoughts (req, res) {
        try {
            const thoughts = await Thought.find().populate('username');
            res.json(thoughts);
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get single thought
    async getSingleThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v')
            .populate('username');

            if(!thought){
                return res.status(404).json({message: 'No thought with that Id' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    // create thought post
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    // update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                {$set: req.body},
                {new: true}
                );

                if(!thought){
                    res.status(404).json({message:'No thought with this ID'});
                }

                res.json(thought);
        }   catch (err){
            console.log(err);
            return res.status(500).json(err);
            
        }
    },
    // Delete to Remove Thought
    async deleteThought ( req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought){
                return res.status(404).json({ message: 'No thought exist'});
            }
            res.json(thought);({message:'thought deleted'})
    }   catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

    },
    //  add user to thought
    async addUserThought (req, res) {
        const { thoughtId, userId } = req.params.thoughtId;
        try {
            const thought = await Thought.findByIdAndUpdate(
                thoughtId,
                {$addToSet: {users: userId} },
                {new: true} 
                ).populate('username');

                if(!thought){
                    return res.status(404).json({ message: 'no thought found with that ID'})
                }
                res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    // delete user thought
    async deleteUserThought (req, res){
        const { thoughtId, userId} = req.params;
        try {
            const thought = await thought.findByIdAndUpdate(
                thoughtId,
                {$pull: {users: userId}},
                {new: true }
                ).populate('username');
              
            if(!thought){
                return res.status(404).json({Message: "no thought found with that Id"})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create reaction
    async createReaction (req, res) {
        const { thoughtID } = req.params;
        const { reactionbody, username} = req.body;

        try {
            const updateThought = await Thought.findByIdAndUpdate(
                thoughtID,
                {$push: {reactions: { reactionbody, username}}},
                {new: true}
            ).populate('username');

            if(!updateThought){
                return res.status(404).json({ message:' No thought found with that ID'});
            }
            res.json( updateThought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    // delete reaction 
    async deleteReaction (req, res) {
        const { thoughtID, reactionId } = req.params;
        
        try {
            const updateThought = await Thought.findByIdAndUpdate(
                thoughtID,
                {$pull: {reactions: { _id: reactionId}}},
                {new: true}
            ).populate('username');

            if(!updateThought){
                return res.status(404).json({ message:' No thought found with that ID'});
            }
            res.json( updateThought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
};

