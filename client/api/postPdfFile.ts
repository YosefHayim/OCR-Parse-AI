import axios from "axios";
const deployedUrl = import.meta.env.VITE_API_BACKEND_DEPLOYED;
const localUrl = import.meta.env.VITE_API_BACKEND_LOCAL;
const isProduction = false;

export const postPdfFile = async (file: File) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const url = `${isProduction ? deployedUrl : localUrl}/api/pdf/extract`;

  const formData = new FormData();
  formData.append("pdfFile", file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading PDF file:", error.response.data.error);
    throw error;
  }
};
