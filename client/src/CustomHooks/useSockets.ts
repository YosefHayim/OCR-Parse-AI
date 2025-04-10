import { SocketContext } from "@/Contexts/Socket";
import { useContext } from "react";

export const useSockets = () => {
  const socket = useContext(SocketContext);

  // First initalize of connection to server
  socket.on("connected", (socket) => {
    console.log("Client is connected to server", socket.id);
  });

  // Intialize and listen to event of progress of extraction data from pdfs.
  socket.on("progress-of-extraction", (data) => {
    console.log(
      `Page ${data.currentPage}/${data.totalPages} - ${data.percent}%`,
    );
  });
};
