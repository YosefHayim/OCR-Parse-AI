import CreateTooltipTriggerTemplate from "../../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const TotalQuantity: React.FC<{
  totalQuantity: number;
  copyTotalQuantityRef: React.RefObject<HTMLDivElement | null>;
}> = ({ totalQuantity, copyTotalQuantityRef }) => {
  return (
    <div className="flex w-full items-start justify-start gap-2">
      <p>
        כמות פריטים:
        <span data-action="copy-quantity-of-page" ref={copyTotalQuantityRef}>
          {totalQuantity}
        </span>
      </p>
      <CreateTooltipTriggerTemplate
        ariaLabelName={`העתק כמות פריטים`}
        dataActionName="copy-quantity-of-page"
        toolTipHoverText={`להעתיק את הכמות  ${totalQuantity}?`}
      />
    </div>
  );
};

export default TotalQuantity;
