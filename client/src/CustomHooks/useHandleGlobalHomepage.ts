import { GlobalStateProps } from "@/pages/Homepage/Homepage";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

export const useHandleGlobalHandler = (
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateProps>>,
  globalState: GlobalStateProps,
  copyTextRef: React.RefObject<HTMLDivElement | null>,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  copyTotalQuantityRef: React.RefObject<HTMLDivElement | null>,
  copyTotalAmountRef: React.RefObject<HTMLDivElement | null>,
  mutatePdfFile: UseMutationResult<string, Error, File, unknown>,
) => {
  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest("[data-action]") as HTMLElement | null;

    if (!button) {
      console.log("no button clicked");
      return;
    }
    console.log("button: ", button);

    const action = button.getAttribute("data-action");

    console.log("action: ", action);

    switch (action) {
      case "recalculate": {
        const divWrapper = button.closest(".father") as HTMLElement;
        const textOfRelevantPage = divWrapper?.querySelector("p[data-ocr-extracted]")?.textContent;

        if (!textOfRelevantPage) {
          toast.warning("אין נתונים לבצע בדיקה חוזרת");
          return;
        }

        break;
      }

      case "reset": {
        setGlobalState({
          ...globalState,
          isLoading: false,
          pageNumberToRecalculateDataAgain: null,
          fileName: null,
          selectedFile: null,
          data: null,
        });
        fileInputRef.current = null;
        copyTextRef.current = null;
        toast.success("איפוס התבצע בהצלחה");

        break;
      }

      case "copy-all-of-results": {
        const textToCopy = copyTextRef.current?.textContent;
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
          toast.success("כל התוצאות הועתקו");
        });
        break;
      }

      case "copy-quantity-of-page": {
        const quantityToCopy = copyTotalQuantityRef.current?.textContent;
        if (!quantityToCopy) return;
        navigator.clipboard.writeText(quantityToCopy).then(() => {
          toast.success("כמות פריטים הועתקו");
        });
        break;
      }

      case "total-amount-of-page": {
        const amountToCopy = copyTotalAmountRef.current?.textContent;
        if (!amountToCopy) return;
        navigator.clipboard.writeText(amountToCopy).then(() => {
          toast.success("סך תשלום הועתקו");
        });
        break;
      }

      case "upload-again": {
        if (!globalState.selectedFile) return;
        setGlobalState({
          ...globalState,
          data: null,
          isLoading: true,
        });
        toast.success(`מבצע חישוב מחדש לקובץ ${globalState.fileName}`);
        mutatePdfFile.mutate(globalState.selectedFile);
        break;
      }

      case "pick-file": {
        fileInputRef.current?.click();
        break;
      }

      case "upload": {
        if (!globalState.selectedFile) return;
        setGlobalState({
          ...globalState,
          data: null,
          isLoading: true,
        });
        mutatePdfFile.mutate(globalState.selectedFile);
        break;
      }

      default:
        break;
    }
  };
  return handleGlobalClick;
};
