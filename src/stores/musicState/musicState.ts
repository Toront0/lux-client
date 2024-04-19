import { ChangeEvent } from "react";

import { create, UseBoundStore, StoreApi } from "zustand";
import { IUseMusicState } from "./musicState.types";

import { SongType } from "@/widgets";

import { shallow } from "zustand/shallow";
import { queryClient } from "@/app/config/react-query/queryClient";
import { reactQueryKeys } from "@/shared";
import { InfiniteData } from "@tanstack/react-query";
import { getLatestVolumeFromLC } from "./helpers";

export const musicState = (
  set: StoreApi<IUseMusicState>["setState"],
  get: StoreApi<IUseMusicState>["getState"]
) => ({
  songs: [],
  initSongs(songs: SongType[]) {
    set({ activeSongIndex: undefined, songs });
  },
  musicRef: undefined,
  initMusicRef(musicRef?: HTMLAudioElement) {
    set({ musicRef: musicRef });
  },
  getMusicInfo(
    musicUrl: string,
    musicTitle: string,
    musicCover: string,
    musicPerformer: string
  ) {
    set({ musicUrl, musicTitle, musicCover, musicPerformer });
  },
  isPaused: true,
  nextSong: {},
  tryToGetNextSong() {
    const cachedNextSong = queryClient.getQueryData([
      reactQueryKeys.music
    ]) as InfiniteData<SongType[]>;

    const songs = cachedNextSong.pages.flatMap((v) => v);

    const currSongIdx = songs.findIndex((v) => v.url === get().musicUrl);

    if (currSongIdx + 1 >= songs.length) {
      get().getMusicInfo(
        songs[0].url,
        songs[0].title,
        songs[0].cover,
        songs[0].performer
      );
    } else {
      get().getMusicInfo(
        songs[currSongIdx + 1].url,
        songs[currSongIdx + 1].title,
        songs[currSongIdx + 1].cover,
        songs[currSongIdx + 1].performer
      );
    }

    get().setIsPaused();

    console.log(
      "cachedNextSong",
      cachedNextSong.pages.flatMap((v) => v)
    );
  },
  setIsPaused() {
    if (get().musicRef?.paused) {
      const playPromise = get().musicRef?.play();
      // set({ isPaused: false });
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // get().musicRef?.play();
            set({ isPaused: false });
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(() => {
            set({ isPaused: true });
            // Auto-play was prevented
            // Show paused UI.
          });
      }
    } else {
      get().musicRef?.pause();
      set({ isPaused: true });
    }
  },
  playSong() {
    get().musicRef?.play();
    set({ isPaused: false });
  },
  activeSongIndex: -1,
  setActiveSongIndex(idx: number) {
    set({ activeSongIndex: idx });
  },
  setNextSong() {
    if (get().activeSongIndex === undefined) {
      set({
        activeSongIndex: 0,
        musicCover: get().songs[0].cover,
        musicTitle: get().songs[0].title,
        musicPerformer: get().songs[0].performer,
        musicUrl: get().songs[0].url
      });
      return;
    }

    if (get().activeSongIndex + 1 >= get().songs.length) {
      set({
        activeSongIndex: 0,
        musicCover: get().songs[0].cover,
        musicTitle: get().songs[0].title,
        musicPerformer: get().songs[0].performer,
        musicUrl: get().songs[0].url
      });
    } else {
      set({
        activeSongIndex: get().activeSongIndex + 1,
        musicCover: get().songs[get().activeSongIndex + 1].cover,
        musicTitle: get().songs[get().activeSongIndex + 1].title,
        musicPerformer: get().songs[get().activeSongIndex + 1].performer,
        musicUrl: get().songs[get().activeSongIndex + 1].url
      });
    }
  },
  setPreviousSong() {
    if (get().activeSongIndex! - 1 < 0) {
      set({ activeSongIndex: 1 });
    } else {
      set({ activeSongIndex: get().activeSongIndex! - 1 });
    }
  },
  currentVolume: getLatestVolumeFromLC(),
  setCurrentVolume(e: ChangeEvent<HTMLInputElement>) {
    if (+e.target.value > 0) {
      window.localStorage.setItem("isMusicMuted", "false");
    } else {
      window.localStorage.setItem("isMusicMuted", "true");
    }

    if (!get().musicRef) return;

    get().musicRef!.volume = +e.target.value / 100;

    window.localStorage.setItem("lastMusicVolume", String(+e.target.value));

    if (get().musicRef) {
      get().musicRef!.volume = +e.target.value / 100;
      set({ currentVolume: +e.target.value });
    }
  },
  currentTime: 0,
  setCurrentTime(currentTime: number) {
    set({
      currentTime: currentTime
    });
  },
  isRandomSong: false,
  toggleIsRandomSong() {
    set({ isRandomSong: !get().isRandomSong });
  },
  isRepeatSong: false,
  toggleIsRepeatSong() {
    set({ isRepeatSong: !get().isRepeatSong });
  },
  onSongEnded() {
    if (get().isRepeatSong) {
      get().setActiveSongIndex(get().activeSongIndex);
      get().setIsPaused();
      return;
    }

    if (get().isRandomSong) {
      const randVal = Math.round(Math.random() * get().songs.length);

      set({
        activeSongIndex: randVal,
        musicCover: get().songs[randVal].cover,
        musicTitle: get().songs[randVal].title,
        musicPerformer: get().songs[randVal].performer,
        musicUrl: get().songs[randVal].url
      });
    }
  },
  muteMusic() {
    if (get().currentVolume > 0) {
      window.localStorage.setItem(
        "lastMusicVolume",
        String(get().currentVolume)
      );

      if (get().musicRef) {
        get().musicRef!.volume = 0;
      }

      set({ currentVolume: 0 });
    } else {
      const res = window.localStorage.getItem("lastMusicVolume");

      const val = res ? +res : 20;

      if (get().musicRef) {
        get().musicRef!.volume = val / 100;
      }

      set({ currentVolume: val });
    }
  },
  cleanup() {
    set({ musicRef: undefined });
  }
});

const musicStore = create<IUseMusicState>(musicState);
/* eslint-disable @typescript-eslint/no-explicit-any */
type GenericState = Record<string, any>;

export const createStoreWithSelectors = <T extends GenericState>(
  store: UseBoundStore<StoreApi<T>>
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
  const useStore: <K extends keyof T>(keys: K[]) => Pick<T, K> = <
    K extends keyof T
  >(
    keys: K[]
  ) => {
    return store((state) => {
      const x = keys.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {} as T);

      return x as Pick<T, K>;
    }, shallow);
  };

  return useStore;
};

export const useMusicState = createStoreWithSelectors(musicStore);
