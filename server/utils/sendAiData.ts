import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendAIData = async (data) => {
  if (!data) {
    throw new Error("No data provided to send to AI.");
  }

  console.log("Data has been send to AI: ", data);

  console.log("Sending data to AI...");
  const r = await client.responses.create({
    model: "gpt-4o",
    input: data,
  });
  console.log("ChatGPT Response: ", r.output_text);
  return r.output_text;
};
