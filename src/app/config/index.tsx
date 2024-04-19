import { Suspense, lazy } from "react";

import {
  UserDetailHomePage,
  UserDetailVideosPage,
  FriendsPage,
  UserDetailFriends,
  AuthPage,
  SettingsPage,
  CreatePostPage,
  SettingsSystem,
  PostDetailPage,
  MusicPlaylistPage,
  UserDetailMusic
} from "@/pages";
import MainLayout from "@/pages/MainLayout";
import { ErrorManager, SettingsLayout, UserDetailLayout } from "@/shared";

import { createBrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/home/ui/index"));
const MessagesPage = lazy(() => import("../../pages/messages/ui/index"));
const MusicPage = lazy(() => import("../../pages/music/ui/index"));
const VideosPage = lazy(() => import("../../pages/video/ui/index"));
const VideoDetailPage = lazy(() => import("../../pages/videoDetail/ui/index"));

export const routes = createBrowserRouter([
  {
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading</div>}>
          <HomePage />
        </Suspense>
      </MainLayout>
    ),
    path: "/",
    errorElement: (
      <MainLayout>
        <ErrorManager />
      </MainLayout>
    )
  },
  {
    element: (
      <MainLayout>
        <PostDetailPage />
      </MainLayout>
    ),
    path: "/posts/:id"
  },
  {
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading</div>}>
          <MessagesPage />
        </Suspense>
      </MainLayout>
    ),
    path: "/messages"
  },
  {
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading</div>}>
          <MusicPage />
        </Suspense>
      </MainLayout>
    ),
    path: "/music"
  },
  {
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading</div>}>
          <VideosPage />
        </Suspense>
      </MainLayout>
    ),
    path: "/videos"
  },
  {
    element: (
      <MainLayout>
        <FriendsPage />
      </MainLayout>
    ),
    path: "/friends"
  },

  {
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading</div>}>
          <VideoDetailPage />
        </Suspense>
      </MainLayout>
    ),
    errorElement: (
      <MainLayout>
        <ErrorManager />
      </MainLayout>
    ),
    path: "/videos/:id"
  },
  {
    element: (
      <MainLayout>
        <UserDetailLayout>
          <UserDetailHomePage />
        </UserDetailLayout>
      </MainLayout>
    ),
    // loader: userDetailLoader(queryClient),
    path: "/:id",
    errorElement: (
      <MainLayout>
        <ErrorManager />
      </MainLayout>
    )
  },
  {
    element: (
      <MainLayout>
        <UserDetailLayout>
          <UserDetailVideosPage />
        </UserDetailLayout>
      </MainLayout>
    ),
    path: "/:id/videos"
  },
  {
    element: (
      <MainLayout>
        <UserDetailLayout>
          <UserDetailMusic />
        </UserDetailLayout>
      </MainLayout>
    ),
    path: "/:id/music"
  },
  {
    element: (
      <MainLayout>
        <MusicPlaylistPage />
      </MainLayout>
    ),
    path: "/:userId/music/playlists/:playlistId"
  },
  {
    element: (
      <MainLayout>
        <UserDetailLayout>
          <UserDetailFriends />
        </UserDetailLayout>
      </MainLayout>
    ),
    path: "/:id/friends"
  },

  {
    element: (
      <MainLayout>
        <SettingsPage />
      </MainLayout>
    ),

    path: "/settings"
  },

  {
    element: (
      <MainLayout>
        <SettingsLayout>
          <SettingsSystem />
        </SettingsLayout>
      </MainLayout>
    ),
    path: "/settings/system"
  },
  {
    element: (
      <MainLayout>
        <CreatePostPage />
      </MainLayout>
    ),

    path: "/create-post"
  },
  {
    element: <AuthPage />,
    path: "/auth"
  }
]);
