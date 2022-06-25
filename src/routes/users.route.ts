import { Router } from "express";
import {
  getUsers,
  getUser,
  postUser,
  patchUser,
  removeUser,
} from "../controllers/user";

const router = Router();

router.get("/users", getUsers);
router.post("/user", postUser);
router.get("/user/:id", getUser);
router.patch("/user/:id", patchUser);
router.delete("/user/:id", removeUser);

export default router;
