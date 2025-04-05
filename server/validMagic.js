import { exec } from "child_process";

exec("magick -version", (err, stdout, stderr) => {
  console.log("MAGICK VERSION:", stdout || stderr);
});
