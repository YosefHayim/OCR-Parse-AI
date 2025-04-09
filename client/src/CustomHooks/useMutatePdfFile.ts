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
      // console.log("Data received from postPdfFile: ", data);

      toast.success(`סיים ניתוח נתונים בהצלחה ${globalState.fileName}`);
      setGlobalState({ ...globalState, data: data.pages, isLoading: false });
    },
    onError: () => {
      toast.error("שגיאה בהעלאת הקובץ");
      setGlobalState({ ...globalState, isLoading: false });
    },
  });
};
