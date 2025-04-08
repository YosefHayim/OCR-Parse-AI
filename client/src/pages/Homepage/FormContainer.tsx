import { Button } from "@/components/ui/button";
import { FaFileUpload } from "react-icons/fa";

const FormContainer = ({
  fileName,
  data,
  selectedFile,
  fileInputRef,
  handleFileChange,
}) => {
  return (
    <form className="rounded-lg border border-dotted bg-gray-200 p-4">
      <div className="w-full text-right">
        <label htmlFor="file" className="font-bold">
          העלאה קובץ
        </label>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <label htmlFor="file" className="cursor-pointer">
          <FaFileUpload
            size={40}
            className="rounded-sm p-1 hover:bg-black hover:text-white"
          />
        </label>
        <div className="relative w-full text-center">
          {fileName}
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            required={true}
            ref={fileInputRef}
            onChange={handleFileChange}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          {data && <Button data-action="reset">אפס תוצאות</Button>}
          {data && <Button data-action="upload">חשב שוב</Button>}
          {!selectedFile ? (
            <Button data-action="pick-file">בחר קובץ</Button>
          ) : (
            <Button data-action="upload">העלאה קובץ</Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormContainer;
