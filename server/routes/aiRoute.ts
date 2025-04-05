import express from "express";
import { organizeDataViaAI } from "../controller/aiController";

const router = express.Router();

router.post("/organize-data", organizeDataViaAI);
