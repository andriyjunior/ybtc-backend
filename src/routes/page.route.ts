import { Router } from "express";
import {
  getPage,
  postPage,
  patchPage,
  removePage,
  getPages,
} from "../controllers/page";

const router = Router();

router.get("/pages", getPages);
router.get("/page/:route", getPage);
router.post("/page", postPage);
router.put("/page/:route", patchPage);
router.delete("/page/:route", removePage);

export default router;
