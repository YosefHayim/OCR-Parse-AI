import os from "os";
import { execSync } from "child_process";

export const resolveMagickPath = (): string => {
  try {
    const platform = os.platform();

    if (platform === "win32") {
      // Windows uses 'where'
      return execSync("where magick").toString().split("\n")[0].trim();
    } else {
      // Unix/Mac/Linux uses 'which'
      return execSync("which magick").toString().trim();
    }
  } catch (err) {
    console.error(" Could not resolve 'magick' command.");
    return "magick"; // fallback if command not found
  }
};
