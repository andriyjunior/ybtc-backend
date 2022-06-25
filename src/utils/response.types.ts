import { Response } from "express";

export interface ICreateResponse {
  res: Response;
  message?: string;
  data?: unknown;
  err?: unknown;
  status?: number;
}
