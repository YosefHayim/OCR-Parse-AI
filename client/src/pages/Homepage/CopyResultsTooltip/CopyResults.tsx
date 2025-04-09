import CreateTooltipTriggerTemplate from "./CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const CopyResults: React.FC<{
  data?: {
    page?: string | null;
    text?: string | null;
    quantitiesFound?: string | null;
  };
}> = ({ data }) => {
  return (
    <div>
      {data && (
        <CreateTooltipTriggerTemplate
          ariaLabelName="העתק את תוצאות"
          dataActionName="copy-all-of-results"
          toolTipHoverText="העתק את כל התוצאות"
        />
      )}
    </div>
  );
};

export default CopyResults;
