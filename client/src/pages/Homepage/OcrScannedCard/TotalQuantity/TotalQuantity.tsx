import CreateTooltipTriggerTemplate from "../../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const TotalQuantity: React.FC<{
  totalQuantity: number;
}> = ({ totalQuantity }) => {
  if (!totalQuantity) {
    return <div></div>;
  }
  return (
    <div className="flex w-full items-start justify-start gap-2" data-action="copy-quantity-of-page">
      כמות פריטים: <p>{totalQuantity}</p>
      <CreateTooltipTriggerTemplate
        ariaLabelName={`העתק כמות פריטים`}
        toolTipHoverText={`להעתיק את הכמות  ${totalQuantity}?`}
      />
    </div>
  );
};

export default TotalQuantity;
