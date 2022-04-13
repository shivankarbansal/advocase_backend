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
