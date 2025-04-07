import fs from "fs";
import path from "path";

const logFilePath = path.join(
  process.cwd(),
  `ocr-log-${new Date().getTime()}.txt`
);

export const logToFile = (message: string) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
};
