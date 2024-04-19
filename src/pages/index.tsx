import HomePage from "./home/ui";
import MessagesPage from "./messages/ui";
import MusicPage from "./music/ui";
import VideosPage from "./video/ui";
import VideoDetailPage from "./videoDetail/ui";
import UserDetailHomePage from "./userDetailHome/ui";
import UserDetailVideosPage from "./userDetailVideos/ui";
import MusicLayout from "./MusicLayout";
import FriendsPage from "./friends/ui";
import UserDetailMusic from "./userDetailMusic/ui";
import UserDetailFriends from "./userDetailFriends/ui";
import AuthPage from "./auth/ui";
import SettingsPage from "./settings/ui";

import CreatePostPage from "./createPost/ui";
import SettingsSystem from "./settingsSystem/ui";
import PostDetailPage from "./postDetail/ui";
import MusicPlaylistPage from "./musicPlaylist/ui";

import { fetchVideosLoader } from "./video/api/loader";
import { videoDetailLoader } from "./videoDetail/api/loader";

export {
  HomePage,
  MessagesPage,
  MusicPage,
  VideosPage,
  VideoDetailPage,
  UserDetailHomePage,
  UserDetailVideosPage,
  MusicLayout,
  FriendsPage,
  UserDetailMusic,
  UserDetailFriends,
  AuthPage,
  SettingsPage,
  SettingsSystem,
  CreatePostPage,
  fetchVideosLoader,
  videoDetailLoader,
  PostDetailPage,
  MusicPlaylistPage
};
