import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  console.log("test");
  res.sendStatus(403);
};
export const getUser = (req: Express.Request, res: Express.Response) => {};
export const postUser = (req: Express.Request, res: Express.Response) => {};
export const patchUser = (req: Express.Request, res: Express.Response) => {};
export const removeUser = (req: Express.Request, res: Express.Response) => {};
