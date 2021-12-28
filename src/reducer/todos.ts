import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { getTodosThunk } from "../thunk/todos"

interface Item {
  id: number;
  text: string;
  createdAt?: number;
  isFinished?: boolean;
}
interface initialTodos {
  syncTodos: Item[],
  asyncTodos: Item[]
}

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    syncTodos: [
      {
        id: Math.random(),
        text: "AAAAAAA",
        isFinished: false,
        createdAt: new Date().getTime(),
      },
      {
        id: Math.random(),
        text: "BBBBBBBB",
        isFinished: false,
        createdAt: new Date().getTime(),
      },
    ],
    asyncTodos: []
  } as initialTodos,
  reducers: {
    /** 预处理写法 */
    syncAddTodo: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.syncTodos.unshift(action.payload);
      },
      prepare: (value: { text: string }) => ({
        payload: {
          ...value,
          id: Math.random(),
          createdAt: new Date().getTime(),
          isFinished: false,
        },
      }),
    },
    /** 常规写法 */
    syncRemoveTodo: (state, action) => {
      state.syncTodos = state.syncTodos.filter((i) => i.id !== action.payload.id)
    },
    syncFinishTodo: (state, action) => {
      console.log(current(state));
      state.syncTodos = state.syncTodos.map((i) => {
        return i.id === action.payload.id ? { ...i, isFinished: true } : i;
      })
    },
  },
  extraReducers: {
    // 避免ts报错，action type以变量为键时需要手动调用type属性或toString方法
    [getTodosThunk.pending.type]: (state, action) => {
      console.log('请求发出了')
    },
    [getTodosThunk.fulfilled.type]: (state, action) => {
      state.asyncTodos = [...state.asyncTodos, ...(action.payload?.data || [])]
    },
    [getTodosThunk.rejected.toString()]: (state, action) => {
      // ....
    },
  }
});

export const { syncAddTodo, syncFinishTodo, syncRemoveTodo } = todosSlice.actions;
export default todosSlice.reducer;
