import "@/App.css";
import { SocketContext } from "./Contexts/Socket";
import AppRoutes from "./routes/routes";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const App = () => {
  return (
    <div className="w-full">
      <SocketContext.Provider value={socket}>
        <AppRoutes />
      </SocketContext.Provider>
    </div>
  );
};

export default App;
