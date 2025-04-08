import express from "express";
import { recalculateSpecificPageInfo } from "../controller/aiController";
const router = express.Router();

router.post("recalculate-info", recalculateSpecificPageInfo);

export default router;
