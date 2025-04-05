import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../../api/postPdfFile";
import { FaFileUpload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const Homepage = () => {
  const [isLoading, setLoading] = useState(false);
  const mutatePdfFile = useMutation({
    mutationFn: postPdfFile,
    onSuccess: (data) => {
      console.log(data);
      setLoading(false);
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    mutatePdfFile.mutate(file);
  };
  return (
    <div className="w-full">
      <Navbar />
      {isLoading ? (
        <div></div>
      ) : (
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-2 bg-white p-4">
            <label htmlFor="file">File Upload</label>
            <div className="rounded-lg border border-dotted bg-gray-200 p-4">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <FaFileUpload size={40} color="gray" />
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf"
                  className="w-full border text-center"
                />
                <Button
                  type="submit"
                  className="rounded-full bg-black hover:bg-gray-500"
                >
                  Select Files
                </Button>
              </div>
            </div>
            <div>
              <h1>Results</h1>
              <div className="flex w-full items-start justify-start rounded-lg bg-gray-200 p-2">
                <p>placeholder</p>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className="flex w-full items-center justify-center">
        <Loader />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
