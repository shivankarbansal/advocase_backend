const Case = require("./../models/caseModel");

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find({ owner: req.lawyer._id });
    // await req.lawyer.populate("cases").execPopulate();
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
    const foundCase = await Case.findOne({
      _id: req.params.id,
      owner: req.lawyer._id,
    });

    console.log(req.params.id);

    if (foundCase) {
      res.status(200).json({
        status: "success",
        data: {
          case: foundCase,
        },
      });
    } else {
      res.status(200).json({
        status: "fail",
        message: "Case not found",
      });
    }
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
      owner: req.lawyer._id,
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
    const updatedCase = await Case.findOneAndUpdate(
      { _id: req.params.id, owner: req.lawyer._id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    if (updatedCase) {
      res.status(200).json({
        status: "success",
        data: {
          case: updatedCase,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Case not found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findOneAndDelete({
      _id: req.params.id,
      owner: req.lawyer._id,
    });
    if (deletedCase) {
      res.status(204).json({
        status: "success",
        data: null,
      });
    } else {
      res.status(404).json({
        status: "fail",
        data: null,
      });
    }
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
