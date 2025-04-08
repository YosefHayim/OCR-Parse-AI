import Loader from "@/Components/Loader/Loader";

const LoadingEffect: React.FC<{ fileName: string | null }> = ({ fileName }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-10">
      <p className="font-bold">מעבד נתונים לקובץ {fileName}</p>
      <Loader />
    </div>
  );
};

export default LoadingEffect;
