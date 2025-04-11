import { GlobalStateProps } from "@/pages/Homepage/Homepage";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

export const useHandleGlobalHandler = (
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateProps>>,
  globalState: GlobalStateProps,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  mutatePdfFile: UseMutationResult<string, Error, File, unknown>,
) => {
  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    const targetOfAction = target.closest("[data-action]") as HTMLElement | null;

    if (!targetOfAction) {
      return;
    }

    const action = targetOfAction.getAttribute("data-action");

    switch (action) {
      case "recalculate": {
        const divWrapper = targetOfAction.closest(".father") as HTMLElement;
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
        toast.success("איפוס התבצע בהצלחה");

        break;
      }

      case "copy-all-of-results": {
        const textToCopy = document.querySelectorAll(".all-data")[0].textContent;
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
          toast.success("כל התוצאות הועתקו");
        });
        break;
      }

      case "copy-quantity-of-page": {
        const quantityToCopy = targetOfAction.querySelector("p")?.innerText;
        if (!quantityToCopy) return;
        navigator.clipboard.writeText(quantityToCopy).then(() => {
          toast.success("כמות פריטים הועתקו");
        });
        break;
      }

      case "total-amount-of-page": {
        const amountToCopy = targetOfAction.querySelector("p")?.innerText;
        if (!amountToCopy) return;
        navigator.clipboard.writeText(amountToCopy).then(() => {
          toast.success("סך תשלום הועתקו");
        });
        break;
      }

      case "supplier-name-of-page": {
        const supplierName = targetOfAction.querySelector("p")?.innerText;
        if (!supplierName) return;
        navigator.clipboard.writeText(supplierName).then(() => {
          toast.success("שם הספק הועתק");
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
