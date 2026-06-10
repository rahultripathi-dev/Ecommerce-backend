import express from "express";
import { user } from "../controllers/user.controller.js"
const router = express.Router();
router.get("/details",user)

export default router