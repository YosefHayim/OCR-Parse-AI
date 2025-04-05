import { multer } from "multer";
import express from "express";
import { pdfExtractor } from "../controller/pdfController";
const router = express.Router();

const upload = multer({ dest: "../uploads" });

router.post("/api/extract-pdf", upload.single("pdfFile"), pdfExtractor);
export default router;
