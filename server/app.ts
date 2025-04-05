import fs from "fs";
import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdfRoute";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

export const outputDir = path.join("images", Date.now().toString());
fs.mkdirSync(outputDir, { recursive: true });

app.use(cors());
app.use(express.json());

app.use("/api", pdfRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is runnig on port${PORT}`);
});
