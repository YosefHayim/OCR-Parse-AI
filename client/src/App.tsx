import "@/App.css";
import { SocketContext } from "./Contexts/Socket";
import AppRoutes from "./routes/routes";
import { io } from "socket.io-client";
import { ProgressBarDataContext } from "./Contexts/ProgressBarData";
import { useState } from "react";

const socket = io("http://localhost:3000");

const App = () => {
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
