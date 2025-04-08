import { useEffect, useRef, useState } from "react";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import FormContainer from "./FormContainer";
import CopyResults from "./CopyResults";
import { useMutatePdfFile } from "@/CustomHooks/useMutatePdfFile";
import { useRecalculatePageInfo } from "@/CustomHooks/useMutateRecalculatePageInfo";
import { useHandleGlobalHandler } from "@/CustomHooks/useHandleGlobalHomepage";
import { useHandleFileChange } from "@/CustomHooks/useHandleFileChange";
export interface GlobalStateProps {
  isLoading: boolean | null;
  pageNumberToRecalculateDataAgain: boolean | null;
  fileName: string | null;
  selectedFile: File | null;
  replacedPageInfo: string | null;
  data?: {
    page?: string | null;
    text?: string | null;
    quantitiesFound?: string | null;
  };
}

interface OCRScannedProps {
  page?: string | null;
  text?: string | null;
  quantitiesFound?: string | null;
}

const Homepage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const copyTextRef = useRef<HTMLDivElement | null>(null);
  const [globalState, setGlobalState] = useState<GlobalStateProps>({
    isLoading: false,
    pageNumberToRecalculateDataAgain: null,
    replacedPageInfo: null,
    fileName: null,
    data: null,
    selectedFile: null,
  });
  const mutatePdfFile = useMutatePdfFile(setGlobalState, globalState);
  const handleFileChange = useHandleFileChange(setGlobalState, globalState);
  const mutateRecalculatePageInfo = useRecalculatePageInfo(
    setGlobalState,
    globalState,
  );
  const handleGlobalClick = useHandleGlobalHandler(
    setGlobalState,
    globalState,
    copyTextRef,
    fileInputRef,
    mutatePdfFile,
  );

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  return (
    <div>
      <Navbar />
      <div
        onClick={handleGlobalClick}
        className="flex w-full flex-col items-center justify-start gap-4 p-4"
        dir="rtl"
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-2 bg-white p-4">
            <FormContainer
              globalState={globalState}
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
                {globalState.data &&
                  globalState.data.length >= 1 &&
                  globalState.data.map(
                    (ocrScanned: OCRScannedProps, index: number) => (
                      <div key={index + 1}>
                        <div className="flex w-full items-start justify-start gap-4">
                          <h2>{ocrScanned.page}</h2>
                          <p>{ocrScanned.text}</p>
                          <p>{ocrScanned.quantitiesFound}</p>
                        </div>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
