import multer from "multer";
import { pdfExtractor } from "../controller/pdfController";
import express from "express";
const router = express.Router();

const upload = multer({ dest: "./uploads" });

router.post("/extract", upload.single("pdfFile"), pdfExtractor);

export default router;
