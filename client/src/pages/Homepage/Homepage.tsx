import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../../api/postPdfFile";
import { recalculateSpecificPageInfo } from "../../../api/recalculateSpecificPageInfo";
import { FaCopy, FaFileUpload } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

type PageData = { page: number; text: string; quantitiesFound?: string };

const Homepage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isClickedRecalculate, setClickRecalculate] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [data, setData] = useState<PageData[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTextRef = useRef<HTMLDivElement>(null);

  const mutatePdfFile = useMutation({
    mutationFn: postPdfFile,
    onSuccess: (data) => {
      setData(data.pages);
      toast(`${fileName} נמצא בתהליך ניתוח נתונים`);
      setLoading(false);
    },
    onError: () => {
      toast("שגיאה בהעלאת הקובץ");
      setLoading(false);
    },
  });

  const mutateSpecificPageInfo = useMutation({
    mutationFn: recalculateSpecificPageInfo,
    onSuccess: (newPageData) => {
      setData(
        (prevData) =>
          prevData?.map((page) =>
            page.page === newPageData.page ? { ...page, ...newPageData } : page,
          ) || null,
      );
      toast(`עמוד ${newPageData.page} עודכן`);
      setClickRecalculate(false);
    },
    onError: () => {
      toast("שגיאה בחישוב מחדש");
      setClickRecalculate(false);
    },
  });

  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest("[data-action]") as HTMLElement | null;

    if (!button) return;

    const action = button.getAttribute("data-action");

    switch (action) {
      case "recalculate": {
        setClickRecalculate(true);

        const pageWrapper = button.closest(".father") as HTMLElement;
        const textElement = pageWrapper?.querySelector("p[data-ocr-extracted]");
        const pageTitle = pageWrapper?.querySelector("h2")?.textContent;

        if (!textElement || !textElement.textContent || !pageTitle) {
          toast("שגיאה בנתוני העמוד");
          setClickRecalculate(false);
          return;
        }

        const pageNumber = parseInt(pageTitle.replace(/\D/g, ""), 10);
        console.log(textElement.textContent);

        // mutateSpecificPageInfo.mutate({
        //   textToRecalculate: textElement.textContent,
        //   page: pageNumber,
        // });

        break;
      }

      case "reset": {
        setClickRecalculate(false);
        setData(null);
        setFileName("");
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        break;
      }

      case "copy-results": {
        const textToCopy = copyTextRef.current?.textContent;
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
          toast("הטקסט הועתק");
        });
        break;
      }

      case "pick-file": {
        fileInputRef.current?.click();
        break;
      }

      case "upload": {
        if (!selectedFile) return;
        setData(null);
        setLoading(true);
        mutatePdfFile.mutate(selectedFile);
        break;
      }

      default:
        break;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("pdf")) {
      toast("נא לצרף קובץ PDF");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
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
        onClick={handleGlobalClick}
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
                  <div className="relative w-full text-center">
                    {fileName}
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
                    {data && <Button data-action="reset">אפס תוצאות</Button>}
                    {!selectedFile ? (
                      <Button data-action="pick-file">בחר קובץ</Button>
                    ) : (
                      <Button
                        data-action="upload"
                        disabled={isLoading || mutatePdfFile.isPending}
                      >
                        העלאה קובץ
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-right font-bold">תוצאות</h1>
                  {data && data?.length > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          data-action="copy-results"
                          className="cursor-pointer rounded-sm p-1 text-black shadow-none hover:bg-black hover:text-white"
                          aria-label="העתק תוצאות"
                        >
                          <FaCopy />
                        </TooltipTrigger>
                        <TooltipContent className="shadow-1xl rounded-lg bg-white p-3 font-bold">
                          העתק תוצאות
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div
                  ref={copyTextRef}
                  className={`${data ? "bg-gray-200" : ""} flex flex-col gap-4 rounded-lg p-4`}
                >
                  {data?.length === 0 && <p>לא נמצאו תוצאות בקובץ.</p>}
                  {data?.map((page, index) => (
                    <div
                      key={index}
                      className="father flex flex-col items-start justify-start gap-2"
                    >
                      <div className="flex w-full items-center justify-start gap-4">
                        <h2>עמוד {page.page}</h2>
                        {isClickedRecalculate && (
                          <div>
                            <Loader smallLoader={true} />
                          </div>
                        )}
                        {!/\d/.test(page.text) && (
                          <Button data-action="recalculate">
                            חשב מחדש נתונים לעמוד {index + 1}
                          </Button>
                        )}
                      </div>
                      <p data-ocr-extracted className="hidden">
                        {page.quantitiesFound}
                      </p>
                      <p>{page.text}</p>
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
