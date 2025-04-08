import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { FaCopy } from "react-icons/fa";

const CopyResults: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      {data && data.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              data-action="copy-results"
              className="cursor-pointer rounded-sm p-1 text-black shadow-none hover:bg-black hover:text-white"
              aria-label="העתק תוצאות"
            >
              <FaCopy />
            </TooltipTrigger>
            <TooltipContent className="shadow-1xl rounded-lg bg-white p-3 font-bold">
              העתק תוצאות
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default CopyResults;
