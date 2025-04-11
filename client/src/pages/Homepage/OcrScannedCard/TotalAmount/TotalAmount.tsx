import CreateTooltipTriggerTemplate from "../../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const TotalAmount: React.FC<{
  totalPayment: number;
}> = ({ totalPayment }) => {
  return (
    <div className="flex w-full items-start justify-start gap-2">
      <p className="w-full">סך הסכום שרשום בחשבונית:{totalPayment}</p>
      <CreateTooltipTriggerTemplate
        textToCopy={totalPayment}
        ariaLabelName={`העתק סכום כולל`}
        toolTipHoverText={`להעתיק את הסכום ${totalPayment}?`}
      />
    </div>
  );
};

export default TotalAmount;
