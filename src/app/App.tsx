import { useEffect, useRef } from "react";

import { RouterProvider } from "react-router-dom";
import { routes } from "./config";

import { GlobalMusicPlayer } from "@/widgets";

import Toaster from "@/widgets/Toaster/ui";
import { useWebsocket } from "@/stores";

const App = () => {
  const websocketConn = useWebsocket();
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    if (!wsRef.current) {
      const ws = new WebSocket(
        `wss://${import.meta.env.VITE_BACKEND_ORIGIN}/ws-listener`
      );
      wsRef.current = ws;
      websocketConn.initWs(ws);
      // ws.onmessage = (msg) => {
      //   const parsed = JSON.parse(msg.data);
      //   addToast({
      //     img: parsed.data.senderPImg,
      //     title: parsed.data.senderFName + parsed.data.senderLName,
      //     subtitle: parsed.data.message,
      //     type: "message"
      //   });
      // };
    }
  }, []);

  return (
    <>
      <GlobalMusicPlayer />
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
