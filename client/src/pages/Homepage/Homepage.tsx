import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../../api/postPdfFile";
import Navbar from "../../Components/Navbar";
import { FaFileUpload } from "react-icons/fa";

const Homepage = () => {
  const mutatePdfFile = useMutation({
    mutationFn: postPdfFile,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
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
      <form
        className="flex flex-col gap-4 bg-red-400 p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-2 bg-white p-4">
          <label htmlFor="file">File Upload</label>
          <div className="rounded-lg border border-dotted bg-gray-300 p-4">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <FaFileUpload size={40} color="gray" />
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf"
                className="w-full text-center"
              />
              <button type="submit" className="">
                Select Files
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Homepage;
