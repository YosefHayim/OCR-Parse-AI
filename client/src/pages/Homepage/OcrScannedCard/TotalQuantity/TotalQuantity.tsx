import CreateTooltipTriggerTemplate from "../../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const TotalQuantity: React.FC<{
  totalQuantity: number;
}> = ({ totalQuantity }) => {
  return (
    <div className="flex w-full items-start justify-start gap-2">
      כמות פריטים: <p className="w-full">{totalQuantity}</p>
      <CreateTooltipTriggerTemplate
        ariaLabelName={`העתק כמות פריטים`}
        toolTipHoverText={`להעתיק את הכמות  ${totalQuantity}?`}
      />
    </div>
  );
};

export default TotalQuantity;
