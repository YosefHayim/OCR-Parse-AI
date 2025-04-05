import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../../api/postPdfFile";
import { FaFileUpload } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Homepage = () => {
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutatePdfFile = useMutation({
    mutationFn: postPdfFile,
    onSuccess: (data) => {
      setData(data);
      toast(`${fileName} נמצא בתהליך ניתוח נתונים`);
      setLoading(false);
    },
    onError: (error) => {
      console.log(error);
      toast("שגיאה בהעלאת הקובץ");
      setLoading(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleButtonClick = () => {
    if (!selectedFile) {
      // No file selected yet – open file dialog
      fileInputRef.current?.click();
    } else {
      // File already selected – start upload
      setLoading(true);
      mutatePdfFile.mutate(selectedFile);
    }
  };

  useEffect(() => {}, [data]);

  return (
    <div>
      <Navbar />
      <div
        className="flex w-full flex-col items-center justify-start gap-4 p-4"
        dir="rtl"
      >
        <Toaster position="top-center" />
        {isLoading ? (
          <div className="flex w-full flex-col items-center justify-center gap-4 p-10">
            <p className="font-bold">מעבד נתונים</p>
            <Loader />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-2 bg-white p-4">
              <div className="w-full text-right">
                <label htmlFor="file" className="font-bold">
                  העלאה קובץ
                </label>
              </div>
              <div className="rounded-lg border border-dotted bg-gray-200 p-4">
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <label htmlFor="file" className="cursor-pointer">
                    <FaFileUpload size={40} color="gray" />
                  </label>
                  <div className="relative w-full">
                    <div className="w-full text-center">
                      {fileName && fileName}
                    </div>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept=".pdf"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      type="button"
                      onClick={handleButtonClick}
                      className="cursor-pointer rounded-full text-white hover:bg-white hover:text-black"
                    >
                      {selectedFile ? "העלה עכשיו" : "בחר קובץ"}
                    </Button>
                    <Button
                      className="cursor-pointer rounded-full text-white hover:bg-white hover:text-black"
                      onClick={() => setData("")}
                    >
                      אפס תוצאות
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <h1 className="w-full text-right font-bold">תוצאות</h1>
                <div
                  className={`${data.info && "bg-gray-200"} flex flex-col gap-4 rounded-lg p-4`}
                >
                  {data.info &&
                    data.info
                      .split(/\*\*(?:Page|עמוד) \d+:\*\*/g)
                      .filter((block) => block.trim() !== "")
                      .map((block, index) => (
                        <div key={index}>
                          <p className="font-bold">עמוד {index + 1}</p>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: block.replace(/\n/g, "<br/>"),
                            }}
                          />
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${data ? "relative" : "absolute bottom-0"} w-full`}>
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
