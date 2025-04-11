import fs from "fs";
import path from "path";
import { currentDate } from "./getDateWCurrentTime";

const logFilePath = path.join(process.cwd(), `./logs/ocr-logs/ocr-log-${currentDate().date}-${currentDate().time}.txt`);

const logAIFilePath = path.join(process.cwd(), `./logs/ai-logs/AI-log-${currentDate().date}-${currentDate().time}.txt`);

export const logToFile = (message: string) => {
  fs.appendFileSync(logFilePath, `[${currentDate().time}]: ${message}\n`);
};

export const logAIToFile = (message: string) => {
  fs.appendFileSync(logAIFilePath, `[${currentDate().time}]: ${message}\n`);
};
