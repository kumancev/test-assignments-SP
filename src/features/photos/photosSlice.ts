import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { PhotoType } from "../../models/album";
import axios from "axios";

type PhotosState = {
  list: PhotoType[];
  loading: boolean;
  error: string | null;
};

export const fetchPhotos = createAsyncThunk<
  PhotoType[],
  string,
  { rejectValue: string }
>("posts/fetchPhotos", async function (id, { rejectWithValue }) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${id}/photos`
    );

    const data = await response.data;

    return data;
  } catch (e) {
    return rejectWithValue("Server Error!");
  }
});

const initialState: PhotosState = {
  list: [],
  loading: false,
  error: null,
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default photosSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
