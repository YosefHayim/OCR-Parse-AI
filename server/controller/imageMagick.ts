import { exec } from "child_process";
import { NextFunction, Request, Response } from "express";

export const testImageMagick = async (req: Request, res: Response, next: NextFunction) => {
  exec("convert -version", (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(`ImageMagick not found: ${stderr}`);
    }
    res.send(`ImageMagick installed: ${stdout}`);
  });
};
