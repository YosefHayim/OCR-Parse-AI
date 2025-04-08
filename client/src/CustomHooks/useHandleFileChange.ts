import { GlobalStateProps } from "@/pages/Homepage/Homepage";
import { toast } from "sonner";

export const useHandleFileChange = (
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateProps>>,
  globalState: GlobalStateProps,
) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("pdf")) {
      toast.warning("נא לצרף קובץ PDF");
      return;
    }

    setGlobalState({
      ...globalState,
      selectedFile: file,
      fileName: file.name,
    });
  };
  toast.success("קובץ נטען בהצלחה");
  return handleFileChange;
};
