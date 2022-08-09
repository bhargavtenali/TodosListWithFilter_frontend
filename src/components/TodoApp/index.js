import { useState } from "react";
import "./index.css";
import TodoItem from "../TodoItem";
import { v4 } from "uuid";

function TodoApp() {
    const [todosList, changeTodos] = useState([]);
    const [input, changeInput] = useState("");

    const addTodoHandler = () => {
        const newTodoItem = { id: v4(), input, isComplete: false };
        changeTodos((prevTodosList) => [...prevTodosList, newTodoItem]);
        changeInput("");
    };
    const deleteTodoHandler = (currentID) => {
        const newTodos = todosList.filter((item) => item.id !== currentID);
        changeTodos(newTodos);
    };

    const changeTodoCompleteHandler = (currentID) => {
        const newTodos = todosList.map((item) => {
            if (item.id === currentID) {
                return { ...item, isComplete: !item.isComplete };
            } else {
                return item;
            }
        });
        // console.log(newTodos[0].isComplete);
        changeTodos(newTodos);
    };

    return (
        <div className="bg-container">
            <h4>Todos List</h4>
            <input
                value={input}
                onChange={(e) => changeInput(e.target.value)}
                type="text"
            />
            {"   "}
            <button onClick={addTodoHandler}>Add Todo</button>
            <br />
            <br />
            {todosList.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    deleteTodoHandler={deleteTodoHandler}
                    changeTodoCompleteHandler={changeTodoCompleteHandler}
                />
            ))}
        </div>
    );
}

export default TodoApp;
