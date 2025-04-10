import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdfRoute";
import aiRouter from "./routes/AiRoute";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());
app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("Mom tool server is running ");
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

app.use("/api/pdf", pdfRouter);
app.use("/api/ai", aiRouter);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
