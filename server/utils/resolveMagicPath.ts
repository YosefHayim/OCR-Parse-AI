import os from "os";
import { execSync } from "child_process";

export const resolveMagickPath = (): string => {
  try {
    const platform = os.platform();

    if (platform === "win32") {
      // Windows uses 'where'
      const windowsLocation = execSync("where magick").toString().trim();
      return windowsLocation;
    } else {
      // Unix/Mac/Linux uses 'which'
      const macLocation = execSync("which magick");
      return macLocation.toString();
    }
  } catch (err) {
    console.error(" Could not resolve 'magick' command.");
    return "magick"; // fallback if command not found
  }
};
