const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: `${/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/}` }, 
  thoughts: 
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],

  friends: 
  [
    {
      type: Schema.Types.ObjectId,
      ref: this,
    },
  ],
},
 {
    toJSON: 
    {
      virtuals: true,
    },
    id: false,
  }
);


// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
// Uses mongoose.model() to create model
const User = mongoose.model('user', userSchema);
  
module.exports = User;