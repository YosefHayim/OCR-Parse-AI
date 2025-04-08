import fs from "fs";
import path from "path";

const logFilePath = path.join(
  process.cwd(),
  `./logs/ocr-log-${new Date().getTime()}.txt`
);

const logAIFilePath = path.join(
  process.cwd(),
  `./logs/AI-log-${new Date().getTime()}.txt`
);

export const logToFile = (message: string) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
};

export const logAIToFile = (message: string) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logAIFilePath, `[${timestamp}] ${message}\n`);
};
