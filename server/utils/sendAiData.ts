import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI();

export const sendAIData = async (data) => {
  if (!data) {
    throw new Error("No data provided to send to AI.");
  }

  console.log("Sending data to AI...");
  const r = await client.responses.create({
    model: "gpt-4o",
    input: data,
  });
  console.log("ChatGPT Response: ", r.output_text);
  return r.output_text;
};

export const sendAIImages = async (filePaths: string[], baseDir = "") => {
  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    throw new Error("No image paths provided");
  }

  console.log("Sending images to AI");

  const results: string[] = [];

  for (const filename of filePaths) {
    const imagePath = path.join(baseDir, filename);
    try {
      const base64Image = fs.readFileSync(imagePath, "base64");

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all readable text from this invoice image.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      });

      const text = completion.choices[0].message.content;
      console.log(`✅ Processed ${filename}`);
      results.push(text || "");
    } catch (err) {
      console.error(`❌ Error processing ${filename}:`, err.message);
      results.push("");
    }
  }

  return results;
};
