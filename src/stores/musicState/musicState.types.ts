import { ChangeEvent } from "react";

import { SongType } from "@/widgets";

type MusicInfo = {
  musicUrl?: string;
  musicTitle?: string;
  musicCover?: string;
  musicPerformer?: string;
};

export interface IUseMusicState {
  songs: SongType[];
  initSongs: (songs: SongType[]) => void;
  musicUrl?: string;
  musicTitle?: string;
  musicCover?: string;
  musicPerformer?: string;
  musicRef: HTMLAudioElement | undefined;
  // nextSong will be fetched when currentSong comes to it's end, it will be taken from cache if exists or will be fetched form actual api
  nextSong: MusicInfo;
  tryToGetNextSong: () => void;
  initMusicRef: (musicRef: HTMLAudioElement | undefined) => void;
  getMusicInfo: (
    musicUrl: string,
    musicTitle: string,
    musicCover: string,
    musicPerformer: string
  ) => void;
  activeSongIndex: number;
  setActiveSongIndex: (idx: number) => void;
  setNextSong: () => void;
  setPreviousSong: () => void;
  isPaused: boolean | undefined;
  setIsPaused: () => void;
  playSong: () => void;
  currentVolume: number;
  setCurrentVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  isRandomSong: boolean;
  toggleIsRandomSong: () => void;
  isRepeatSong: boolean;
  toggleIsRepeatSong: () => void;
  onSongEnded: () => void;
  muteMusic: () => void;
  cleanup: () => void;
}
