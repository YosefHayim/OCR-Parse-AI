const { exec } = require("child_process");

exec("convert -version", (err, stdout, stderr) => {
  if (err) {
    console.error(
      "❌ ImageMagick not available inside Node:",
      stderr || err.message
    );
    return;
  }
  console.log("✅ ImageMagick is working inside Node:");
  console.log(stdout);
});
