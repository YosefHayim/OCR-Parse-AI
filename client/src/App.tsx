import AppRoutes from "./routes/routes";
import { io } from "socket.io-client";
import "@/App.css";

const App = () => {
  const socket = io();

  socket.on("connect", () => {
    console.log(socket.connected);
  });

  socket.on("progress-of-extraction", () => {
    if (socket.connected) {
      socket.emit("progress-of-extraction", () => {
        "Client is connected and ready to recieve progress of extraction pdf";
      });
    }
  });

  return (
    <div className="w-full">
      <AppRoutes />
    </div>
  );
};

export default App;
