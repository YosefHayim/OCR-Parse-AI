import { OCRScannedProps } from "../Homepage";
import DebugText from "./DebugText/DebugText";
import ScannedPage from "./ScannedPage/ScannedPage";
import SupplierName from "./SupplierName/SupplierName";
import TotalAmount from "./TotalAmount/TotalAmount";
import TotalQuantity from "./TotalQuantity/TotalQuantity";

const OcrScannedCard: React.FC<OCRScannedProps> = ({ ocrScanned, copyTotalAmountRef, copyTotalQuantityRef }) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start justify-start gap-1">
        <ScannedPage pageNumber={ocrScanned.page} />
        <SupplierName supplierName={ocrScanned.supplierName} />
        <DebugText debugText={ocrScanned.text} />
        <TotalQuantity copyTotalQuantityRef={copyTotalQuantityRef} totalQuantity={ocrScanned.totalQuantity} />

        <TotalAmount copyTotalAmountRef={copyTotalAmountRef} totalPayment={ocrScanned.totalPayment} />
        <hr className="w-full " />
      </div>
    </div>
  );
};

export default OcrScannedCard;
