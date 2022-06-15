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
    unique: true,
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
      title: {
        type: String,
        required: [true, "A note title is required"],
        trim: true,
      },
      body: {
        type: String,
        required: [true, "A note body is required"],
        trim: true,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'Lawyer'
  }
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
