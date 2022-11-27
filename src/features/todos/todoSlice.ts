import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { TodoType } from "../../models/todo";
import axios from "axios";

type TodosState = {
  list: TodoType[];
  loading: boolean;
  error: string | null;
};

export const fetchTodos = createAsyncThunk<
  TodoType[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const data = await response.data;

    return data;
  } catch (e) {
    return rejectWithValue("Server Error!");
  }
});

export const fetchTodoUpdate = createAsyncThunk<
  TodoType,
  number,
  { rejectValue: string; state: { todos: TodosState } }
>("todos/fetchTodoUpdate", async function (id, { rejectWithValue, getState }) {
  const todo = getState().todos.list.find((todo) => todo.id === id);

  if (todo) {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        todo
      );

      return (await response.data) as TodoType;
    } catch (e) {
      return rejectWithValue("Can't toggle status. Server error.");
    }
  }

  return rejectWithValue("No such todo in the list!");
});

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeStatus(state, action: PayloadAction<number>) {
      const findTodo = state.list.find(
        (todo) => Number(todo.id) === action.payload
      );
      if (findTodo) {
        findTodo.completed = !findTodo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodoUpdate.fulfilled, (state, action) => {
        const toggledTodo = state.list.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.completed = !toggledTodo.completed;
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export const { changeStatus } = todoSlice.actions;
export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
