import fs from "fs";
import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdfRoute";
import path from "path";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

export const outputDir = path.join("images", Date.now().toString());
fs.mkdirSync(outputDir, { recursive: true });

app.use(cors());
app.use(express.json());

app.use("/api", pdfRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runnig on port${PORT}`);
});
