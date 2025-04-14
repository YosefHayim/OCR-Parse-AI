import CreateTooltipTriggerTemplate from "../../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const TotalAmount: React.FC<{
  totalPayment: number;
}> = ({ totalPayment }) => {
  if (!totalPayment) {
    return <div></div>;
  }
  return (
    <div className="flex w-full items-start justify-start gap-2" data-action="total-amount-of-page">
      סך הסכום שרשום בחשבונית:<p>{totalPayment}</p>
      <CreateTooltipTriggerTemplate ariaLabelName={`העתק סכום כולל`} toolTipHoverText={`להעתיק את הסכום ${totalPayment}?`} />
    </div>
  );
};

export default TotalAmount;
