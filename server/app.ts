import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdfRoute";

const app = express();
const PORT = process.env.PORT || 3000;
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
