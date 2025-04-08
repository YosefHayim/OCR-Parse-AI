import axios from "axios";
const deployedUrl = import.meta.env.VITE_API_BACKEND_DEPLOYED;
const localUrl = import.meta.env.VITE_API_BACKEND_LOCAL;

const isProduction = false;

export const recalculateSpecificPageInfo = async (data: string) => {
  if (!data) {
    throw new Error("Missing data in order to make recalculation to page.");
  }
  const url = `${isProduction ? deployedUrl : localUrl}/api/ai/recalculate-info`;

  try {
    const response = await axios.post(url, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error uploading PDF file:", error.response.data.error);
    throw error;
  }
};
