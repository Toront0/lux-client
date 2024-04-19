import { QueryKey } from "@tanstack/react-query";

export interface IUseWebsocket {
  ws: WebSocket | undefined;
  initWs: (ws: WebSocket) => void;
  dialogDetailQueryKey: QueryKey;
  initDialogDetailQueryKey: (q: QueryKey) => void;
  messagesListenerSetup: () => void;
}
