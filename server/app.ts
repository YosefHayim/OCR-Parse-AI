import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import { createWorker } from "tesseract.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/api/extract-pdf", upload.single("pdfFile"), async (req, res) => {
  const pdfPath = req.file?.path;
  if (!pdfPath) return res.status(400).json({ error: "No file uploaded" });

  const outputDir = path.join("images", Date.now().toString());
  fs.mkdirSync(outputDir, { recursive: true });

  try {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();

    let extractedText = "";
    const worker = await createWorker("eng");

    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPages()[i];
      const { width, height } = page.getSize();

      // Render to PNG using sharp (blank white background placeholder)
      const pngPath = path.join(outputDir, `page-${i + 1}.png`);
      const svg = await page.renderToSvg();
      await sharp(Buffer.from(svg))
        .resize(Math.floor(width), Math.floor(height))
        .png()
        .toFile(pngPath);

      const {
        data: { text },
      } = await worker.recognize(pngPath);
      extractedText += `--- Page ${i + 1} ---\n${text}\n\n`;
    }

    await worker.terminate();

    // Cleanup
    fs.unlinkSync(pdfPath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    res.json({ text: extractedText });
  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ error: "OCR failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
