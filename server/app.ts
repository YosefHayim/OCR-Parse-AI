import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdfRoute";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mom tool server is running ");
});

app.use("/api", pdfRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
