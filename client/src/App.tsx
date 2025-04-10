import AppRoutes from "./routes/routes";
import { io } from "socket.io-client";
import "@/App.css";

const App = () => {
  const socket = io("http://localhost:3000");

  socket.on("connected", () => {
    console.log("Client is connected to server");
  });

  return (
    <div className="w-full">
      <AppRoutes />
    </div>
  );
};

export default App;
