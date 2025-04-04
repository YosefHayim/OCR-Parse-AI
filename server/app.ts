import express from "express";
import pdf from "pdf-parse";
import fs from "fs";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("PDF server is running!");
});

app.post("/extract-pdf", (req, res) => {
  const { pdfData } = req.body;
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
