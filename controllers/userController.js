const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const usersObj = {
          users
        };
        return res.json(usersObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

   // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

    // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

    // update a user
  async updateUser(req, res) {

   const filter = { _id: req.params.userId };
   const update = req.body;
   
   try {
   const doc = await User.findOneAndUpdate(filter, update, {new: true });
    res.json(doc);
   } catch(e) {
     res.status(500).json(e);
   }
      
  },

  // Delete a user and remove associated thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndRemove(
              req.body
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'user deleted, but no thougts for the user was found',
            })
          : res.json({ message: 'User thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    async addFriend(req, res) {

   const filter = { _id: req.body };
   const update = { $push: {friends: req.params.friendId}  };
   
   try {
   const updatedUser = await User.findOneAndUpdate(filter, update, {new: true });
    res.json(updatedUser);
   } catch(e) {
     res.status(500).json(e);
   }
      
  },


    async deleteFriend(req, res) {

   const filter = { _id: req.body };
   const update = { $pull: {friends: req.params.friendId  } };
   
   try {
   const updatedUser = await User.findOneAndUpdate(filter, update, {new: true });
    res.json(updatedUser);
   } catch(e) {
     res.status(500).json(e);
   }
      
  },


}