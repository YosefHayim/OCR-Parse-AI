import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../../api/postPdfFile";
import { FaFileUpload } from "react-icons/fa";
import { useState } from "react";
import Loader from "components/Loader/Loader";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import { Button } from "components/ui/button";

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
            <div className="w-full text-right">
              <label htmlFor="file">העלאה קובץ</label>
            </div>
            <div className="rounded-lg border border-dotted bg-gray-200 p-4">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <label htmlFor="file">
                  <FaFileUpload size={40} color="gray" />
                </label>
                <div className="relative w-full">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf"
                    required={true}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="pointer-events-none w-full rounded border px-4 py-2 text-center">
                    <span id="fileLabel" className="text-gray-500">
                      לחצי על האייקון או הכפתור להעלאת קובץ
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="cursor-pointer rounded-full bg-black hover:bg-gray-500"
                >
                  <label htmlFor="file"> Select Files</label>
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <h1 className="w-full text-right">תוצאות</h1>
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
