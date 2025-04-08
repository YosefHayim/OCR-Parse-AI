import { useMutation } from "@tanstack/react-query";
import { postPdfFile } from "../../api/postPdfFile";
import { toast } from "sonner";
import { GlobalStateProps } from "@/pages/Homepage/Homepage";

export const useMutatePdfFile = (
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateProps>>,
  globalState: GlobalStateProps,
) => {
  return useMutation({
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
};
