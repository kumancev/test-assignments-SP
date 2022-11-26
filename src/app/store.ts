import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";
import postsReducer from "../features/posts/postsSlice";
import albumsReducer from "../features/albums/albumsSlice";
import photosReducer from "../features/photos/photosSlice";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    posts: postsReducer,
    albums: albumsReducer,
    photos: photosReducer,
    comments: commentsReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(middleware);
  // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
