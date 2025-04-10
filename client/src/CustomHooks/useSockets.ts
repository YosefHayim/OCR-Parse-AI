import { ProgressBarDataContext } from "@/Contexts/ProgressBarData";
import { SocketContext } from "@/Contexts/Socket";
import { useContext, useEffect } from "react";

export const useSockets = () => {
  const [progressBarData, setProgressBar] = useContext(ProgressBarDataContext);

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    // First initalize of connection to server
    socket.on("connected", (socket) => {
      console.log("Client is connected to server", socket.id);
    });

    // Intialize and listen to event of progress of extraction data from pdfs.
    socket.on("progress-of-extraction", (data) => {
      if (data) setProgressBar(data);
      console.log(progressBarData);
    });

    // turn off socket when there is no more rendering info.
    return () => {
      socket.off("progress-of-extraction");
    };
  }, [socket]);
};
