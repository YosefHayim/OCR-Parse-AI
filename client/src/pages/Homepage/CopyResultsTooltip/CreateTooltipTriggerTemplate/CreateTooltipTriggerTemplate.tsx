import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { FaCopy } from "react-icons/fa";

const CreateTooltipTriggerTemplate: React.FC<{
  ariaLabelName: string;
  toolTipHoverText: string;
}> = ({ ariaLabelName, toolTipHoverText }) => {
  if (!ariaLabelName || !toolTipHoverText) {
    throw new Error("Please provide to the tooltip template the attributes that are missing!");
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="shadow-1xl cursor-pointer rounded-sm p-1 text-black hover:bg-black hover:text-white " aria-label={ariaLabelName}>
          <FaCopy />
        </TooltipTrigger>
        <TooltipContent className="shadow-1xl rounded-lg bg-white p-3 text-sm font-bold">{toolTipHoverText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreateTooltipTriggerTemplate;
