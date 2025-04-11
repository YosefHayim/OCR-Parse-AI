import { envPaths } from "@/envPaths";
import axios from "axios";

export const recalculateSpecificPageInfo = async (data: string) => {
  if (!data) {
    throw new Error("Missing data in order to make recalculation to page.");
  }
  const url = `${envPaths.NODE_ENV === "production" ? envPaths.DEPLOYED_URL : envPaths.LOCAL_URL}/api/ai/recalculate-info`;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error uploading PDF file:", error.response.data.error);
    throw error;
  }
};
