import CreateTooltipTriggerTemplate from "../../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const TotalAmount: React.FC<{
  totalPayment: number;
  copyTotalAmountRef: React.RefObject<HTMLDivElement | null>;
}> = ({ totalPayment, copyTotalAmountRef }) => {
  return (
    <div className="flex w-full items-start justify-start gap-2">
      <p>
        סך הסכום שרשום בחשבונית:{" "}
        <span data-action="total-amount-of-page" ref={copyTotalAmountRef}>
          {totalPayment}
        </span>
      </p>
      <CreateTooltipTriggerTemplate
        ariaLabelName={`העתק סכום כולל`}
        dataActionName="total-amount-of-page"
        toolTipHoverText={`להעתיק את הסכום ${totalPayment}?`}
      />
    </div>
  );
};

export default TotalAmount;
