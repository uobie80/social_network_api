const {Schema, model} = require('mongoose');

const reEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const userSchema = new Schema(
{
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: reEmail }, 
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
      ref: 'User',
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
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
// Uses mongoose.model() to create model
const User = model('User', userSchema);
  
module.exports = User;