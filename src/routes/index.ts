import { getUsers } from "../controllers/user";
import { Router } from "express";
import users from "./users.route";

const router = Router();

router.use(users);
// router.get("users", (req,res) => res);

export = router;
