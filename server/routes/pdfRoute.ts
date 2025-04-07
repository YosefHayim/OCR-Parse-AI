import multer from "multer";
import express from "express";
import { pdfExtractor } from "../controller/pdfController";
const router = express.Router();

const upload = multer({ dest: "./uploads" });

router.post("/extract-pdf", upload.single("pdfFile"), pdfExtractor);

export default router;
