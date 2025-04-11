import "@/App.css";
import { SocketContext } from "./Contexts/Socket";
import AppRoutes from "./routes/routes";
import { io } from "socket.io-client";
import { ProgressBarDataContext } from "./Contexts/ProgressBarData";
import { useState } from "react";
import { envPaths } from "./envPaths";

const socket = io(envPaths.NODE_ENV === "production" ? envPaths.DEPLOYED_URL : envPaths.LOCAL_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"], // helps avoid fallback problems
});

const App = () => {
  socket.on("connect", () => {});

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
