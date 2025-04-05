import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
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
    // 🖼 Convert PDF to PNGs at high density
    await new Promise((resolve, reject) => {
      exec(
        `/opt/homebrew/bin/convert -density 400 -units PixelsPerInch -colorspace RGB
"${pdfPath}" "${outputDir}/page-%d.png"`,
        (error, stdout, stderr) => {
          if (error) {
            console.error("❌ ImageMagick convert error:", stderr);
            reject(error);
          } else {
            console.log("✅ PDF converted to PNGs");
            resolve(true);
          }
        }
      );
    });

    // 🧠 Prepare files list
    const files = fs
      .readdirSync(outputDir)
      .filter((f) => f.endsWith(".png"))
      .sort(
        (a, b) =>
          parseInt(a.match(/\d+/)?.[0] || "0") -
          parseInt(b.match(/\d+/)?.[0] || "0")
      );

    const worker = await createWorker("eng");

    let pages: { page: number; text: string }[] = [];

    // 🧼 Preprocess and OCR
    for (let i = 0; i < files.length; i++) {
      const originalPath = path.join(outputDir, files[i]);
      const processedPath = path.join(outputDir, `processed-${i}.png`);

      await sharp(originalPath)
        .resize({ width: 1600 })
        .grayscale()
        .normalize()
        .threshold(160)
        .toFile(processedPath);

      const {
        data: { text },
      } = await worker.recognize(processedPath);

      console.log(`📄 Page ${i + 1} OCR Text:\n`, text.slice(0, 300)); // show sample
      pages.push({ page: i + 1, text });
    }

    await worker.terminate();

    // 🧹 Cleanup
    fs.unlinkSync(pdfPath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    res.json({ pages });
  } catch (err) {
    console.error("❌ Error during processing:", err);
    res.status(500).json({ error: "OCR failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
