const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: { type: mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId(); } },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: function (createdAt) { return new Date(createdAt).toString(); } },
  }
);

module.exports = reactionSchema;