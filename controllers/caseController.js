const Case = require("./../models/caseModel");

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find();
    return res.status(200).json({
      status: "success",
      results: cases.length,
      data: {
        cases,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const foundCase = await Case.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        case: foundCase,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createCase = async (req, res) => {
  try {
    const newCase = await Case.create({
      ...req.body,
      owner:req.lawyer._id
    });
    res.status(201).json({
      status: "success",
      data: {
        case: newCase,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        case: updatedCase,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.addNotes = async (req, res) => {
  try {
    const note = await Case.findByIdAndUpdate(
      req.params.id,
      {
        $push: { caseNotes: req.body },
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const foundCase = await Case.findById(req.params.id);
    const notes = foundCase.caseNotes;
    res.status(200).json({
      status: "success",
      data: {
        notes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateNotes = async (req, res) => {
  try {
    const note = await Case.findOneAndUpdate(
      { _id: req.query.caseId, "caseNotes._id": req.query.id },
      {
        $set: {
          "caseNotes.$": req.body,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (note == null) {
      res.status(404).json({
        status: "error",
        message: "Note not found, Check note id",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          note,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "asdf",
      message: err.message,
    });
  }
};
