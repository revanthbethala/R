import express from "express";
import { storeMockResult, getUserMockTests } from "../controllers/mock.controller.js";

const router = express.Router();

router.post("/mock-tests", storeMockResult);

router.get("/mock-tests/:userId", getUserMockTests);

export default router;
