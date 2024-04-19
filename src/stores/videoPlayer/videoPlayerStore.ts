import { create } from "zustand";
import { IUseVideoPlayerState } from "./videoPlayerStore.types";

export const useVideoPlayerState = create<IUseVideoPlayerState>((set) => ({
  currentUrl: null,
  setCurrentUrl(url) {
    set({ currentUrl: url });
  }
}));
