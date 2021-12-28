import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos } from "../service/todos"


export const getTodosThunk = createAsyncThunk("todos/getTodos", async () => await getTodos())

// or
// const getTodosCreator = createAction("todos/getTodos")
// export const getTodosThunk = createAsyncThunk(getTodosCreator.type, async () => await getTodos())

