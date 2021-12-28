import { useState, useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  syncAddTodo,
  syncFinishTodo,
  syncRemoveTodo,
} from "./reducer/todos";
import { getTodosThunk } from "./thunk/todos";

function App() {
  const dispatch = useAppDispatch();
  const { syncTodos, asyncTodos } = useAppSelector((state) => state.todos);
  const [todoText, setTodoText] = useState("");

  /** 同步 */
  const handleSyncAddTodo = () => {
    dispatch(
      syncAddTodo({
        text: todoText,
      })
    );
  };
  const handleSyncFinishedTodo = (id: number) => {
    dispatch(syncFinishTodo({ id }));
  };
  const handleSyncRemoveTodo = (id: number) => {
    dispatch(syncRemoveTodo({ id }));
  };

  /** 异步 */
  useEffect(() => {
    dispatch(getTodosThunk())
  }, [])


  return (
    <div className="App">
      <div>同步demo</div>
      <div>
        <input
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
        />
        <button onClick={handleSyncAddTodo}>添加</button>
      </div>
      <ul>
        {syncTodos.map((i) => (
          <li key={i.id}>
            {i.isFinished ? (
              <>
                <del>{i.text}</del>
              </>
            ) : (
              <>
                <span>{i.text}</span>
                <button onClick={() => handleSyncFinishedTodo(i.id)}>
                  完成
                </button>
              </>
            )}
            <button onClick={() => handleSyncRemoveTodo(i.id)}>删除</button>
          </li>
        ))}
      </ul>
      <div>异步demo</div>
      <div>
        <input
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
        />
        <button onClick={handleSyncAddTodo}>添加</button>
      </div>
      <ul>
        {asyncTodos.map((i) => (
          <li key={i.id}>
            {i.isFinished ? (
              <>
                <del>{i.text}</del>
              </>
            ) : (
              <>
                <span>{i.text}</span>
                <button onClick={() => handleSyncFinishedTodo(i.id)}>
                  完成
                </button>
              </>
            )}
            <button onClick={() => handleSyncRemoveTodo(i.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
