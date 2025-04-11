import { ProgressBarDataProps } from "@/pages/Homepage/Homepage";
import { createContext } from "react";

type ProgressBarContextType = [ProgressBarDataProps | null, React.Dispatch<React.SetStateAction<ProgressBarDataProps>>];

export const ProgressBarDataContext = createContext<ProgressBarContextType | null>(null);
