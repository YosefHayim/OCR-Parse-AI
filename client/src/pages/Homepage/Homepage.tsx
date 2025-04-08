import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../../api/postPdfFile";
import { FaCopy, FaFileUpload } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

const Homepage = () => {
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [data, setData] = useState<string[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTextRef = useRef(null);

  const mutatePdfFile = useMutation({
    mutationFn: postPdfFile,
    onSuccess: (data) => {
      console.log(data.pages);
      setData(data.pages);
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

  const handleReset = () => {
    setData("");
    setFileName("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopyText = () => {
    const textToCopy = copyTextRef.current?.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast("הטקסט הועתק");
    });
  };

  useEffect(() => {
    if (data) {
      copyTextRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

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
            <p className="font-bold">מעבד נתונים לקובץ {fileName}</p>
            <Loader />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-2 bg-white p-4">
              <div className="w-full text-right">
                <label
                  htmlFor="file"
                  className="cursor-pointer rounded-sm p-1 font-bold hover:bg-black hover:text-white"
                >
                  העלאה קובץ
                </label>
              </div>
              <div className="rounded-lg border border-dotted bg-gray-200 p-4">
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <label htmlFor="file" className="cursor-pointer">
                    <FaFileUpload
                      size={40}
                      className="rounded-sm p-1 hover:bg-black hover:text-white"
                    />
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
                    {data && (
                      <Button
                        className="cursor-pointer rounded-full text-white hover:bg-white hover:text-black"
                        onClick={handleReset}
                      >
                        אפס תוצאות
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={handleButtonClick}
                      className="cursor-pointer rounded-full text-white hover:bg-white hover:text-black"
                    >
                      {selectedFile && !data ? "העלה עכשיו" : "בחר קובץ"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-right font-bold">תוצאות</h1>
                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={handleCopyText}
                          className="cursor-pointer rounded-sm p-1 text-black shadow-none hover:bg-black hover:text-white"
                        >
                          <FaCopy />
                        </TooltipTrigger>
                        <TooltipContent className="shadow-1xl rounded-lg bg-white p-3 font-bold">
                          העתק תוצאות
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div
                  ref={copyTextRef}
                  className={`${data && "bg-gray-200"} flex flex-col gap-4 rounded-lg p-4`}
                >
                  {data &&
                    data.map((pageData, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start justify-start gap-2"
                      >
                        <h2>{pageData.page}</h2>
                        <p>{pageData.text}</p>
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
