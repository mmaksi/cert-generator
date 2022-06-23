const mongoose = require("mongoose");

const adminsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model("Admin", adminsSchema);
