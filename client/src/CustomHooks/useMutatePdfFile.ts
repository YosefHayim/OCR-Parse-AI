import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../api/postPdfFile";
import { GlobalStateProps } from "@/pages/Homepage/Homepage";
import { toast } from "sonner";

export const useMutatePdfFile = (
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateProps>>,
  globalState: GlobalStateProps,
) => {
  return useMutation({
    mutationFn: postPdfFile,
    onSuccess: (data) => {
      toast.success(`${globalState.fileName} נמצא בתהליך ניתוח נתונים`);
      setGlobalState({ ...globalState, data: data.pages });
      setGlobalState({ ...globalState, isLoading: false });
    },
    onError: () => {
      toast.error("שגיאה בהעלאת הקובץ");
      setGlobalState({ ...globalState, isLoading: false });
    },
  });
};
