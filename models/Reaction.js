const {Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId, default: function () { return new Types.ObjectId(); } },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: function (createdAt) { return new Date(createdAt).toString(); } },
  }
);

module.exports = reactionSchema;