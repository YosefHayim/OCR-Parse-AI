import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../api/postPdfFile";

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
    <div>
      <h1>Helping mom extract PDFs data</h1>
      <form
        className="flex flex-col gap-4 bg-red-400 p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-2 bg-white p-4">
          <label htmlFor="file">Provide file: </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            className="border"
          />
        </div>
        <div className="bg-black text-center text-white">
          <button type="submit" className="">
            Extract Information from PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default Homepage;
