const mongoose = require('mongoose');


// The librarySchema defines the schema of the parent document
const thoughtSchema = new mongoose.Schema(
{
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: { type: Date, default: Date.now, get: function (createdAt) { return new Date(createdAt).toString() } }, 
  username: { type: String, required: true },
  // This will include an array that holds all the reations
  reactions: [reactionSchema],
 
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
// Uses mongoose.model() to create model
const Thought = mongoose.model('thought', thoughtSchema);
  
module.exports = Thought;

