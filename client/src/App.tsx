import AppRoutes from "./routes/routes";
import { io } from "socket.io-client";
import "@/App.css";

const App = () => {
  const socket = io("http://localhost:3000");

  socket.on("connected", (socket) => {
    console.log("Client is connected to server", socket.id);
  });

  socket.on("progress-of-extraction", (data) => {
    console.log(
      `Page ${data.currentPage}/${data.totalPages} - ${data.percent}%`,
    );
  });

  return (
    <div className="w-full">
      <AppRoutes />
    </div>
  );
};

export default App;
