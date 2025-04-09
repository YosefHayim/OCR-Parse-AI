import { useEffect, useRef, useState } from "react";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import CopyResults from "./CopyResultsTooltip/CopyResults";
import { useMutatePdfFile } from "@/CustomHooks/useMutatePdfFile";
import { useRecalculatePageInfo } from "@/CustomHooks/useMutateRecalculatePageInfo";
import { useHandleGlobalHandler } from "@/CustomHooks/useHandleGlobalHomepage";
import { useHandleFileChange } from "@/CustomHooks/useHandleFileChange";
import FormContainer from "./FormContainer/FormContainer";
import OcrScannedCard from "./OcrScannedCard/OcrScannedCard";
export interface GlobalStateProps {
  isLoading: boolean | null;
  pageNumberToRecalculateDataAgain: boolean | null;
  fileName: string | null;
  selectedFile: File | null;
  replacedPageInfo: string | null;
  data?: OCRScannedProps | null;
}

export interface OCRScannedProps {
  copyTotalAmountRef: React.RefObject<HTMLDivElement | null>;
  copyTotalQuantityRef: React.RefObject<HTMLDivElement | null>;
  data: [
    {
      page?: string | null;
      supplierName?: string | null;
      totalQuantity?: number | null;
      totalPayment?: number | null;
    },
  ];
}

const Homepage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const copyTextRef = useRef<HTMLDivElement | null>(null);
  const copyTotalQuantityRef = useRef<HTMLDivElement | null>(null);
  const copyTotalAmountRef = useRef<HTMLDivElement | null>(null);
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
    copyTotalQuantityRef,
    copyTotalAmountRef,
    mutatePdfFile,
  );

  useEffect(() => {
    console.log(import.meta.env);
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
                <div className="flex w-full items-start justify-start gap-1">
                  <h1 className="text-right font-bold">תוצאות של הקובץ</h1>
                  <p className="font-bold underline">{globalState.fileName}</p>
                  <CopyResults data={globalState.data} />
                </div>
              </div>
              <div
                ref={copyTextRef}
                className={`${globalState.data ? "bg-gray-200" : ""} flex flex-col gap-4 rounded-lg p-4`}
              >
                {!globalState.data ||
                  globalState.data === null ||
                  (globalState.data === undefined && (
                    <p> {globalState.fileName} לא נמצאו תוצאות בקובץ.</p>
                  ))}
                {globalState.data &&
                  globalState.data.length >= 1 &&
                  globalState.data.map(
                    (ocrScanned: OCRScannedProps, index: number) => (
                      <OcrScannedCard
                        ocrScanned={ocrScanned}
                        key={index}
                        copyTotalQuantityRef={copyTotalQuantityRef}
                        copyTotalAmountRef={copyTotalAmountRef}
                      />
                    ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
