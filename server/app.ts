import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdfRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", pdfRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
