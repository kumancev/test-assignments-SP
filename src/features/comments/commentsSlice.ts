import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { CommentType } from "../../models/comment";
import axios from "axios";

type CommentsState = {
  list: CommentType[];
  loading: boolean;
  error: string | null;
};

export const fetchComments = createAsyncThunk<
  CommentType[],
  string,
  { rejectValue: string }
>("posts/fetchComments", async function (id, { rejectWithValue }) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    const data = await response.data;

    return data;
  } catch (e) {
    return rejectWithValue("Server Error!");
  }
});

const initialState: CommentsState = {
  list: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default commentsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
