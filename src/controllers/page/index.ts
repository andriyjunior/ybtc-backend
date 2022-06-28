import { Request, Response } from "express";
import { Page } from "../../schemas";
import { createErrorResponse, createSuccessResponse } from "../../utils";

export const getPages = async (req: Request, res: Response) => {
  try {
    const data = await Page.find();

    createSuccessResponse({ res, data, message: "Found page" });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

export const getPage = async (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    const data = await Page.findOne({ route });

    createSuccessResponse({ res, data, message: "Found page" });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

export const postPage = async (req: Request, res: Response) => {
  const body = req.body;
  const { lng } = req.params;

  const newPage = new Page(body);

  try {
    const response = await newPage.save();

    createSuccessResponse({
      res,
      data: response,
      message: "Page saved successfully",
    });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

export const patchPage = async (req: Request, res: Response) => {
  const body = req.body;
  const { route } = req.params;

  try {
    const response = await Page.findOneAndUpdate({ route }, body);

    createSuccessResponse({
      res,
      data: response,
      message: "Page updated successfully",
    });
  } catch (err) {
    createErrorResponse({ res, err });
  }
};

export const removePage = (req: Request, res: Response) => {};
