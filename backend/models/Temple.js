const mongoose = require("mongoose");

const TempleSchema = new mongoose.Schema(
{
  templeName: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  templeImage: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Temple", TempleSchema);