import { create } from "zustand";
import { IUseWebsocket } from "./websocket.types";
import { InfiniteData, QueryKey } from "@tanstack/react-query";
import { queryClient } from "@/app/config/react-query/queryClient";
import { UserMessageType } from "@/pages/messages/config/types";
import { reactQueryKeys } from "@/shared";

export const useWebsocket = create<IUseWebsocket>((set, get) => ({
  ws: undefined,
  initWs(ws) {
    set({ ws: ws });
  },
  dialogDetailQueryKey: {} as QueryKey,
  initDialogDetailQueryKey(q) {
    set({ dialogDetailQueryKey: q });
  },
  async messagesListenerSetup() {
    if (get().ws) {
      get().ws!.onmessage = (msg) => {
        const parsed = JSON.parse(msg.data);

        console.log("get().dialogDetailQueryKey", get().dialogDetailQueryKey);

        queryClient.setQueryData(
          [reactQueryKeys.dialogDetail],
          (prev: InfiniteData<UserMessageType[]>) => {
            console.log("prev", prev);

            const newPage = [...prev.pages];

            // newPage[newPage.length - 1].push(parsed.data);

            newPage[0] = [
              ...prev.pages[0],
              {
                id: parsed.data.id,
                createdAt: parsed.data.createdAt,
                senderId: parsed.data.senderId,
                receiverId: parsed.receiverId,
                message: parsed.data.message,
                profileImg: parsed.data.senderPImg
              }
            ];

            return {
              ...prev,
              pages: newPage
            };
          }
        );
        // queryClient.setQueriesData(
        //   { queryKey: get().dialogDetailQueryKey },
        //   (oldData: any) => {
        //     const newPages = [...oldData.pages];

        //     newPages[newPages.length - 1].push(parsed.data);

        //     console.log("oldData", oldData);

        //     return {
        //       ...oldData,
        //       pages: newPages
        //     };
        //   }
        // );

        // queryClient.invalidateQueries({ queryKey: get().dialogDetailQueryKey });
      };
    }
  }
}));
