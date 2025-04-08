import { GlobalStateProps } from "@/pages/Homepage/Homepage";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

export const useHandleGlobalHandler = (
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateProps>>,
  globalState: GlobalStateProps,
  copyTextRef: React.RefObject<HTMLDivElement | null>,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  mutatePdfFile: UseMutationResult<any, Error, File, unknown>,
) => {
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
          toast.warning("אין נתונים לבצע בדיקה חוזרת");
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
        toast.success("איפוס התבצע בהצלחה");

        break;
      }

      case "copy-results": {
        const textToCopy = copyTextRef.current?.textContent;
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
          toast.success("הטקסט הועתק");
        });

        break;
      }

      case "pick-file": {
        fileInputRef.current?.click();
        break;
      }

      case "upload": {
        if (!globalState.selectedFile) return;

        if (fileInputRef?.current) {
          fileInputRef.current.value = "";
        }

        setGlobalState({
          ...globalState,
          data: null,
          fileName: "",
          isLoading: true,
        });
        mutatePdfFile.mutate(globalState.selectedFile);
        toast.success("קובץ נטען בהצלחה");

        break;
      }

      default:
        break;
    }
  };
  return handleGlobalClick;
};
