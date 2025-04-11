import CreateTooltipTriggerTemplate from "./CreateTooltipTriggerTemplate/CreateTooltipTriggerTemplate";

const CopyResults: React.FC<{
  data?: string | null;
}> = ({ data }) => {
  return (
    <div data-action="copy-all-of-results">
      {data && <CreateTooltipTriggerTemplate ariaLabelName="העתק את תוצאות" toolTipHoverText="העתק את כל התוצאות" />}
    </div>
  );
};

export default CopyResults;
