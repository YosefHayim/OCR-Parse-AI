import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../../api/postPdfFile";
import { recalculateSpecificPageInfo } from "../../../api/recalculateSpecificPageInfo";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster, toast } from "sonner";
import LoadingEffect from "./LoadingEffect";
import FormContainer from "./FormContainer";
import CopyResults from "./CopyResults";

interface GlobalStateProps {
  isLoading: boolean | null;
  pageNumberToRecalculateDataAgain: boolean | null;
  fileName: string | null;
  selectedFile: File | null;
  data?: any;
}

const Homepage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTextRef = useRef<HTMLDivElement>(null);
  const [globalState, setGlobalState] = useState<GlobalStateProps>({
    isLoading: false,
    pageNumberToRecalculateDataAgain: null,
    fileName: null,
    data: null,
    selectedFile: null,
  });

  const mutatePdfFile = useMutation({
    mutationFn: postPdfFile,
    onSuccess: (data) => {
      toast(`${globalState.fileName} נמצא בתהליך ניתוח נתונים`);
      setGlobalState({ ...globalState, data: data.pages });
      setGlobalState({ ...globalState, isLoading: false });
    },
    onError: () => {
      toast("שגיאה בהעלאת הקובץ");
      setGlobalState({ ...globalState, isLoading: false });
    },
  });

  const mutateSpecificPageInfo = useMutation({
    mutationFn: recalculateSpecificPageInfo,
    onSuccess: (data) => {
      console.log(data);
      toast(`עמוד  עודכן`);
      setGlobalState({
        ...globalState,
        pageNumberToRecalculateDataAgain: null,
      });
    },
    onError: () => {
      toast("שגיאה בחישוב מחדש");
      setGlobalState({
        ...globalState,
        pageNumberToRecalculateDataAgain: null,
      });
    },
  });

  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest("[data-action]") as HTMLElement | null;

    if (!button) {
      console.log("no button clicked");
      return;
    }

    const action = button.getAttribute("data-action");

    switch (action) {
      case "recalculate": {
        const divWrapper = button.closest(".father") as HTMLElement;
        const textOfRelevantPage = divWrapper?.querySelector(
          "p[data-ocr-extracted]",
        )?.textContent;

        if (!textOfRelevantPage) {
          toast("אין נתונים לבצע בדיקה חוזרת");
          return;
        }

        break;
      }

      case "reset": {
        setGlobalState({
          ...globalState,
          data: null,
          fileName: "",
          pageNumberToRecalculateDataAgain: null,
          selectedFile: null,
        });
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
        if (!globalState.selectedFile) return;

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        setGlobalState({
          ...globalState,
          data: null,
          fileName: "",
        });
        mutatePdfFile.mutate(globalState.selectedFile);

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

    setGlobalState({
      ...globalState,
      selectedFile: file,
      fileName: file.name,
    });
  };

  useEffect(() => {
    if (globalState.data) {
      copyTextRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [globalState.data]);

  return (
    <div>
      <Navbar />
      <div
        onClick={handleGlobalClick}
        className="flex w-full flex-col items-center justify-start gap-4 p-4"
        dir="rtl"
      >
        <Toaster position="top-center" />
        {globalState.isLoading ? (
          <LoadingEffect fileName={globalState.fileName} />
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-2 bg-white p-4">
              <FormContainer
                handleFileChange={handleFileChange}
                data={globalState.data}
                fileName={globalState.fileName}
                fileInputRef={fileInputRef}
                selectedFile={globalState.selectedFile}
              />
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-right font-bold">תוצאות</h1>
                  <CopyResults data={globalState.data} />
                </div>
                <div
                  ref={copyTextRef}
                  className={`${globalState.data ? "bg-gray-200" : ""} flex flex-col gap-4 rounded-lg p-4`}
                >
                  {globalState.data?.length === 0 && (
                    <p> {globalState.fileName} לא נמצאו תוצאות בקובץ.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
