import { useMutation } from "@tanstack/react-query";
import { recalculateSpecificPageInfo } from "../../api/recalculateSpecificPageInfo";
import { toast } from "sonner";
import { GlobalStateProps } from "@/pages/Homepage/Homepage";

export const useRecalculatePageInfo = (
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateProps>>,
  globalState: GlobalStateProps,
) => {
  return useMutation({
    mutationFn: recalculateSpecificPageInfo,
    onSuccess: (data) => {
      console.log(data);
      toast.success(`עמוד  עודכן`);
      setGlobalState({
        ...globalState,
        pageNumberToRecalculateDataAgain: null,
        isLoading: false,
      });
    },
    onError: () => {
      toast.error("שגיאה בחישוב מחדש");
      setGlobalState({
        ...globalState,
        pageNumberToRecalculateDataAgain: null,
        isLoading: false,
      });
    },
  });
};
