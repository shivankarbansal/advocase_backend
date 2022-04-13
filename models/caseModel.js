const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  caseName: {
    type: String,
    required: [true, "A case must have a name"],
    trim: true,
  },
  caseNumber: {
    type: Number,
    required: [true, "A case must have a Case Number"],
    trim: true,
  },
  caseType: {
    type: String,
    required: true,
    trim: true,
  },
  courtName: {
    type: String,
    required: [true, "A case must have a court name"],
    trim: true,
  },
  partyName: {
    type: String,
    required: [true, "A case must have a party name"],
    trim: true,
  },
  partyContactNumber: {
    type: Number,
    required: [true, "A case must have a Party Number"],
    trim: true,
  },
  adverseAdvocateName: {
    type: String,
    required: [true, "A case must have an adverse party advocate name"],
    trim: true,
  },
  adverseAdvocateNumber: {
    type: Number,
    required: [true, "A case must have an adverse party advocate number"],
    trim: true,
  },
  caseNotes: [
    {
      type: String,
      trim: true,
    },
  ],
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
