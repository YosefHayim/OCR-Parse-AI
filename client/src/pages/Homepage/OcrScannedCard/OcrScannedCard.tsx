import { OCRScannedProps } from "../Homepage";

const OcrScannedCard: React.FC<OCRScannedProps> = ({ ocrScanned }) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start justify-start gap-1">
        <p className="font-bold">{ocrScanned.page}</p>
        <p>כמות פריטים: {ocrScanned.totalQuantity}</p>
        <p>סך הסכום שרשום בחשבונית: {ocrScanned.totalPayment}</p>
        <hr className="w-full " />
      </div>
    </div>
  );
};

export default OcrScannedCard;
