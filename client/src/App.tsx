import "@/App.css";
import { SocketContext } from "./Contexts/Socket";
import AppRoutes from "./routes/routes";
import { io } from "socket.io-client";
import { ProgressBarDataContext } from "./Contexts/ProgressBarData";
import { useState } from "react";
import { envPaths } from "./envPaths";

const socket = io("http://localhost:3000");
console.log("Client mode is:", envPaths.NODE_ENV);

const App = () => {
  socket.on("connect", () => {
    console.log("\nConnected to server");
  });

  socket.on("connect_error", (err) => {
    console.error("\nSocket connection failed:", err.message);
  });

  const [progressBar, setProgressBar] = useState(null);
  return (
    <div className="w-full">
      <SocketContext.Provider value={socket}>
        <ProgressBarDataContext.Provider value={[progressBar, setProgressBar]}>
          <AppRoutes />
        </ProgressBarDataContext.Provider>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
