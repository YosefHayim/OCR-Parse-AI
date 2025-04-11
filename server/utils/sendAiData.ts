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

  // console.log("Sending data to AI...");
  const r = await client.responses.create({
    model: "gpt-4o",
    input: data,
  });
  // console.log("ChatGPT Response: ", r.output_text);
  return r.output_text;
};

export const sendAIImages = async (filePath: string, baseDir, quantityIFound) => {
  const imagePath = path.join(baseDir, filePath);
  let base64Image;

  try {
    if (baseDir) {
      base64Image = fs.readFileSync(imagePath, "base64");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: quantityIFound,
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
    return text;
  } catch (err) {
    console.error(` Error processing ${filePath}:`, err.message);
  }
};
