import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { AlbumType } from "../../models/album";
import axios from "axios";

type AlbumsState = {
  list: AlbumType[];
  loading: boolean;
  error: string | null;
};

export const fetchAlbums = createAsyncThunk<
  AlbumType[],
  undefined,
  { rejectValue: string }
>("posts/fetchAlbums", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums"
    );

    const data = await response.data;

    return data;
  } catch (e) {
    return rejectWithValue("Server Error!");
  }
});

// export const getPhotos = createAsyncThunk<Photo[], string, { rejectValue: string }>(
//   "posts/getPhotos",
//   async function (id, { rejectWithValue }) {
//     try {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/albums/${id}/photos`
//       );

//       const data = await response.data;

//       return data;
//     } catch (e) {
//       return rejectWithValue("Server Error!");
//     }
//   }
// );

const initialState: AlbumsState = {
  list: [],
  loading: false,
  error: null,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      // .addCase(getPhotos.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getPhotos.fulfilled, (state, action) => {
      //   state.list = action.payload;
      //   state.loading = false;
      // })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default albumsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
