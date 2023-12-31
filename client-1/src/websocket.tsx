import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
export function useWebSocket(token: string) {
  const [serviceStatus, setServiceStatus] = useState("");
  var socket: Socket;
  var socketRef = useRef<Socket>();
  useEffect(() => {
    socket = io("http://localhost:8000", {
      auth: {
        token,
      },
    });
    socketRef.current = socket;
    socket.on("disconnect", () => {
      console.log("Disconnect");
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
    socket.on("message", (msg) => {
      console.log("DSADAS " + JSON.stringify(msg));
    });
    socket.on("error", (msg) => {
      console.log("Socket Said Error : " + JSON.stringify(msg));
    });

    return () => {
      socket.close();
    };
  }, []);
  function sendMessage(message: any) {
    console.log("SENDED MESSAGE :", message);
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }
  }
  return { sendMessage };
}
