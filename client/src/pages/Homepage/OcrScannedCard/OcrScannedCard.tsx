import CreateTooltipTriggerTemplate from "../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";
import { OCRScannedProps } from "../Homepage";

const OcrScannedCard: React.FC<OCRScannedProps> = ({
  ocrScanned,
  copyTotalAmountRef,
  copyTotalQuantityRef,
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start justify-start gap-1">
        <p className="font-bold">{ocrScanned.page}</p>
        <div className="flex w-full items-start justify-start gap-2">
          <p>
            כמות פריטים:
            <span
              data-action="copy-quantity-of-page"
              ref={copyTotalQuantityRef}
            >
              {ocrScanned.totalQuantity}
            </span>
          </p>
          <CreateTooltipTriggerTemplate
            ariaLabelName={`העתק כמות פריטים`}
            dataActionName="copy-quantity-of-page"
            toolTipHoverText={`להעתיק את הכמות  ${ocrScanned.totalQuantity}?`}
          />
        </div>
        <div className="flex w-full items-start justify-start gap-2">
          <p>
            סך הסכום שרשום בחשבונית:
            <span data-action="total-amount-of-page" ref={copyTotalAmountRef}>
              {ocrScanned.totalPayment}
            </span>
          </p>
          <CreateTooltipTriggerTemplate
            ariaLabelName={`העתק סכום כולל`}
            dataActionName="total-amount-of-page"
            toolTipHoverText={`להעתיק את הסכום ${ocrScanned.totalPayment}?`}
          />
        </div>
        <hr className="w-full " />
      </div>
    </div>
  );
};

export default OcrScannedCard;
