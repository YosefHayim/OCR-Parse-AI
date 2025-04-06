import { FaTools } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between bg-black p-2 text-white">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => location.reload()}
      >
        <FaTools />
        <b>MomTool</b>
      </div>
    </div>
  );
};

export default Navbar;
