const { Page } = require("../../schemas");
const { createErrorResponse, createSuccessResponse } = require("../../utils");

const getPages = async (req, res) => {
  try {
    const data = await Page.find();

    createSuccessResponse({ res, data, message: "Found page" });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

const getPage = async (req, res) => {
  const { route } = req.params;
  try {
    const data = await Page.findOne({ route });

    createSuccessResponse({ res, data, message: "Found page" });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

const postPage = async (req, res) => {
  const body = req.body;
  const { lng } = req.params;

  const newPage = new Page(body);

  try {
    const response = await newPage.save();

    createSuccessResponse({
      res,
      data,
      message: "Page saved successfully",
    });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

const putPage = async (req, res) => {
  const body = req.body;
  const { route } = req.params;

  try {
    const response = await Page.findOneAndUpdate({ route }, body);

    createSuccessResponse({
      res,
      data,
      message: "Page updated successfully",
    });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

const removePage = (req, res) => {};

module.exports = { getPage, getPages, putPage, removePage, postPage };
