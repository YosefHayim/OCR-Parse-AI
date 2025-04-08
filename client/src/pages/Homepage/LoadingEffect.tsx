import Loader from "@/components/Loader/Loader";

const LoadingEffect = ({ fileName: string }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-10">
      <p className="font-bold">מעבד נתונים לקובץ {fileName}</p>
      <Loader />
    </div>
  );
};

export default LoadingEffect;
