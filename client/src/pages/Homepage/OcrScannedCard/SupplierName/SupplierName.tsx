import CreateTooltipTriggerTemplate from "../../CopyResultsTooltip/CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const SupplierName: React.FC<{ supplierName: string }> = ({ supplierName }) => {
  if (!supplierName) {
    return <div></div>;
  }
  return (
    <div className="flex items-start justify-start" data-action="supplier-name-of-page">
      שם הספק: <p>{supplierName}</p>
      <CreateTooltipTriggerTemplate ariaLabelName={`העתק שם הספק`} toolTipHoverText={`להעתיק את שם הספק ${supplierName}?`} />
    </div>
  );
};

export default SupplierName;
