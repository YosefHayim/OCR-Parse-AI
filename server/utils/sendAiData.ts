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

  console.log("Sending data to AI...");
  const r = await client.responses.create({
    model: "gpt-4o",
    input: `Returned back a nicley formatted list of current page, supplier name if exist,total quantities per page, total amount paid per page: ${JSON.stringify(
      data
    )}`,
  });
  console.log("ChatGPT Response: ", r.output_text);
  return r.output_text;
};
