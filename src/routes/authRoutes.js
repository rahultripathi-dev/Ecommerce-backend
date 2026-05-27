import express from "express";

import {
  signup,
} from "../controllers/signup.controller.js";

import {
  login,
} from "../controllers/login.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

export default router;  