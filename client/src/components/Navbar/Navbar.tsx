import { FaTools } from "react-icons/fa";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between bg-black p-2 text-white">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <FaTools />
          <b>MomTool</b>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
