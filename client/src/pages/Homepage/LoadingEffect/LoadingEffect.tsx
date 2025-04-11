import Loader from "@/Components/Loader/Loader";
import { ProgressBarDataContext } from "@/Contexts/ProgressBarData";
import { useContext, useEffect } from "react";

const LoadingEffect: React.FC<{ fileName: string | null }> = ({ fileName }) => {
  const [progressBarData, setProgressBar] = useContext(ProgressBarDataContext);

  useEffect(() => {}, [progressBarData]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-10">
      {progressBarData?.precent > 0 && !progressBarData.precent && (
        <div className="w-full">
          <p className="">{progressBarData.precent}%</p>
          <div className="relative h-[1em] w-full bg-gray-300">
            <div
              className="absolute left-0 top-0 h-[1em] bg-black"
              style={{ width: `${progressBarData.percent}%` }}
            ></div>
          </div>
        </div>
      )}
      <p className="font-bold">מעבד נתונים לקובץ {fileName}</p>
      <Loader />
    </div>
  );
};

export default LoadingEffect;
