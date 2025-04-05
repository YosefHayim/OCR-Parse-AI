import { Routes, Route } from "react-router";
import Homepage from "../pages/Homepage/Homepage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};

export default AppRoutes;
