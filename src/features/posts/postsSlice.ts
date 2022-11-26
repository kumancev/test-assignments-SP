import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { PostType } from "../../models/post.type";
import axios from "axios";


type PostsState = {
  list: PostType[];
  post?: PostType;
  loading: boolean;
  error: string | null;
};

export const fetchPosts = createAsyncThunk<
  PostType[],
  undefined,
  { rejectValue: string }
>("posts/fetchPosts", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/"
    );

    const data = await response.data;

    return data;
  } catch (e) {
    return rejectWithValue("Server Error!");
  }
});

export const getPost = createAsyncThunk<
  PostType,
  string,
  { rejectValue: string }
>("posts/getPost", async function (id, { rejectWithValue }) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/`
    );

    const data = await response.data;

    return data;
  } catch (e) {
    return rejectWithValue("Server Error!");
  }
});

export const updatePost = createAsyncThunk<
  PostType,
  PostType,
  { rejectValue: string; state: { posts: PostsState } }
>("posts/updatePost", async function (post, { rejectWithValue, getState }) {
  const Post = getState().posts.list.find((post) => post.id === post.id);

  if (Post) {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/`,
        {
          title: post.title,
          body: post.body,
        }
      );

      console.log("post UPDATED");
      return (await response.data) as PostType;
    } catch (e) {
      return rejectWithValue("Can't update post. Server error.");
    }
  }

  return rejectWithValue("No such post in the list!");
});

export const createPost = createAsyncThunk<
  PostType,
  PostType,
  { rejectValue: string }
>("posts/createPost", async function (post, { rejectWithValue }) {
  const newPost = {
    title: post.title,
    body: post.body,
    userId: 1,
  };

  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts/",
      newPost
    );

    return (await response.data) as PostType;
  } catch (e) {
    return rejectWithValue("Can't add new post. Server error.");
  }
});

export const deletePost = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("posts/deletePost", async function (id, { rejectWithValue }) {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}/`
    );

    if (response.data) {
      console.log("post DELETED");
    }

    return id;
  } catch (e) {
    return rejectWithValue("Can't delete task. Server error.");
  }
});

const initialState: PostsState = {
  list: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(createPost.pending, (state) => {
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const Post = state.list.find((post) => post.id === action.payload.id);
        if (Post) {
          Post.title = action.payload.title;
          Post.body = action.payload.body;
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default postsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
