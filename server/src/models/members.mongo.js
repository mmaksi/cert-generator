const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
  memberId: {
    type: String,
  },
  generatedId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specification: {
    //   full stack, backend, frontend, designer, hr,...
    type: String,
    required: true,
  },
  projects: {
    type: [ String ],
    required: true,
  },
  hardSkills: {
    type: [ String ],
    required: true,
  },
  softSkills: {
    type: [ String ],
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  kpi: {
    type: Number,
    required: true,
  },
  isEmployee: {
    type: Boolean,
    required: true,
  },
  isIntern: {
    type: Boolean,
    required: true,
  },
  duration: {
    // duration of internship or employment
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model("Member", membersSchema);
