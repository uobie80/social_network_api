const { User, Thought, Types } = require('../models');



module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

    // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

async createThought(req, res) {
  try {
      const thought = await Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username, });
      const filter = { _id: req.body.userId };
      const thoughtId = thought._id;
      const update = { $push: { thoughts: thoughtId } };

   const updatedThought = await User.findOneAndUpdate(filter, update, { new: true });
    res.json(updatedThought)
  } catch(err) {
     res.json(err);
  }
 },

async updateThought(req, res) {
  try {
      
      const filter = { _id: req.params.thoughtId };
      const update = { $set: { thoughtText: req.body.thoughtText } };
      const thought = await Thought.findOneAndUpdate(filter, update, { new: true });
    res.json(thought)
  } catch(err) {
     res.json(err);
  }
 },
 

 async deleteThought(req, res) {
  try {
      
      const filter = { _id: req.params.thoughtId };
      const thought = await Thought.findOneAndRemove(filter, {new:true});
    res.json(thought)
  } catch(err) {
     res.json(err);
  }
 },


 async createReaction(req, res) {

   try {

     let reaction = {
              reactionBody: req.body.reactionBody,
              username: req.body.username
           } 

    
  const filter = { _id: req.params.thoughtId };
  const update = { $push: { reactions: reaction } };
  const thought = await Thought.findOneAndUpdate(filter, update, { new: true });
  res.json(thought);
  } catch(err) {

    res.json(err);
  }
 },

 async deleteReaction(req, res) {
   try {
          const filter = { _id: req.params.thoughtId };
          const update = { $pull: { reactions: { reactionId: req.body.reactionId } } };
          const thought = await Thought.findOneAndUpdate(filter, update, { new: true });
          res.json( thought);
       } catch(err) {
          console.err(err);
          res.json(err);
       }
 },


}
