import { Router } from "express";
import page from "./page.route";

const router = Router();

router.use(page);

export = router;
