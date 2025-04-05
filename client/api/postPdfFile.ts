import axios from "axios";

export const postPdfFile = async (file: File) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const url = "http://localhost:3000/api/extract-pdf";

  const formData = new FormData();
  formData.append("pdfFile", file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading PDF file:", error.response.data.error);
    throw error;
  }
};
