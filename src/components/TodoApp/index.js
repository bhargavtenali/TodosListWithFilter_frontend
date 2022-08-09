import { useState } from "react";
import "./index.css";
import TodoItem from "../TodoItem";
import { v4 } from "uuid";

const STATUS_CONSTANTS = { COMPLETE: "complete", INCOMPLETE: "incomplete" }

function TodoApp() {
    const [todosList, changeTodosList] = useState(JSON.parse(localStorage.getItem("todolist")));
    const [name, changeName] = useState("");
    const [description, changeDescription] = useState("");
    const [time, changeTime] = useState("");
    const [status, changeStatus] = useState(STATUS_CONSTANTS.INCOMPLETE)
    const [displayFilter, changedisplayFilter] = useState("all")

    const addTodoHandler = (e) => {
        e.preventDefault()
        const newTodoItem = {
            id: v4(), name, description, time,
            isComplete: (status === STATUS_CONSTANTS.COMPLETE ? true : false)
        };
        const actualTodosList = JSON.parse(localStorage.getItem("todolist"))
        const newActualTodosList = [...actualTodosList, newTodoItem]
        localStorage.setItem("todolist", JSON.stringify(newActualTodosList))
        const filteredTodos = newActualTodosList.filter((item) => {
            if (displayFilter === "all") {
                return true
            }
            else {
                return ((item.isComplete ? STATUS_CONSTANTS.COMPLETE : STATUS_CONSTANTS.INCOMPLETE) === displayFilter)
            }
        })
        changeTodosList(filteredTodos)
        changeName("");
        changeDescription("");
        changeTime("");
        changeStatus(STATUS_CONSTANTS.INCOMPLETE);
    };

    const deleteTodoHandler = (currentID) => {
        const actualTodosList = JSON.parse(localStorage.getItem("todolist"))
        const newActualTodosList = actualTodosList.filter((item) => item.id !== currentID);
        localStorage.setItem("todolist", JSON.stringify(newActualTodosList))
        const filteredTodos = newActualTodosList.filter((item) => {
            if (displayFilter === "all") {
                return true
            }
            else {
                return ((item.isComplete ? STATUS_CONSTANTS.COMPLETE : STATUS_CONSTANTS.INCOMPLETE) === displayFilter)
            }
        })
        changeTodosList(filteredTodos)

    };

    const changeTodoCompleteHandler = (currentID) => {
        const actualTodosList = JSON.parse(localStorage.getItem("todolist"))
        const newActualTodosList = actualTodosList.map((item) => {
            if (item.id === currentID) {
                return { ...item, isComplete: !item.isComplete };
            } else {
                return item;
            }
        });
        // console.log(newTodos[0].isComplete);
        localStorage.setItem("todolist", JSON.stringify(newActualTodosList))
        const filteredTodos = newActualTodosList.filter((item) => {
            if (displayFilter === "all") {
                return true
            }
            else {
                return ((item.isComplete ? STATUS_CONSTANTS.COMPLETE : STATUS_CONSTANTS.INCOMPLETE) === displayFilter)
            }
        })
        changeTodosList(filteredTodos)
    };

    const changeFilterHandler = (event) => {
        const currentFilterValue = event.target.value
        const actualTodosList = JSON.parse(localStorage.getItem("todolist"))
        const filteredTodos = actualTodosList.filter((item) => {
            if (currentFilterValue === "all") {
                return true
            }
            else {
                return ((item.isComplete ? STATUS_CONSTANTS.COMPLETE : STATUS_CONSTANTS.INCOMPLETE) === currentFilterValue)
            }
        })
        changeTodosList(filteredTodos)
        changedisplayFilter(currentFilterValue)
    }


    return (
        <div className="bg-container">
            <div className="app-container" >
                <form className="form-container" onSubmit={addTodoHandler}>
                    <h1 className="heading" >Add TODO</h1>
                    <div className="input-container" >
                        <label className="labelStyle" htmlFor="name" >Title</label>
                        {"  "}
                        <input
                            className="inputStyle"
                            id="name"
                            value={name}
                            onChange={(e) => changeName(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="input-container" >
                        <label className="labelStyle" htmlFor="description" >Description</label>
                        {"  "}
                        <input
                            className="inputStyle"
                            id="description"
                            value={description}
                            onChange={(e) => changeDescription(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="input-container">
                        <label className="labelStyle" htmlFor="time">Time</label>
                        {"  "}
                        <input
                            className="inputStyle"
                            id="time"
                            value={time}
                            onChange={(e) => changeTime(e.target.value)}
                            type="time"
                        />
                    </div>
                    <div className="input-container">
                        <div>
                            <input
                                id="complete"
                                name="status"
                                value={STATUS_CONSTANTS.COMPLETE}
                                onChange={(e) => changeStatus(e.target.value)}
                                type="radio"
                                checked={status === STATUS_CONSTANTS.COMPLETE}
                            />
                            <label className="labelStyle" htmlFor="complete" >Complete</label>
                        </div>
                        <div>
                            <input
                                id="incomplete"
                                name="status"
                                value={STATUS_CONSTANTS.INCOMPLETE}
                                onChange={(e) => changeStatus(e.target.value)}
                                type="radio"
                                checked={status === STATUS_CONSTANTS.INCOMPLETE}
                            />
                            <label className="labelStyle" htmlFor="incomplete" >Not Complete</label>
                        </div>
                    </div>
                    <button className="button" type="submit">Add Task</button>
                </form>
                <div className="todoList-container">
                    <h1 className="heading">TODO LIST</h1>
                    <div className="input-container" >
                        <label className="labelStyle" htmlFor="todoListView" >Filter</label>
                        <select
                            className="inputStyle"
                            value={displayFilter}
                            onChange={changeFilterHandler}
                            name="todoListView" id="todoListView">
                            <option value="all" >All</option>
                            <option value={STATUS_CONSTANTS.COMPLETE}>Already Completed</option>
                            <option value={STATUS_CONSTANTS.INCOMPLETE}>InComplete</option>
                        </select>
                    </div>
                    <div className="todo-container">
                        {todosList.map((item) => (
                            <TodoItem
                                key={item.id}
                                item={item}
                                deleteTodoHandler={deleteTodoHandler}
                                changeTodoCompleteHandler={changeTodoCompleteHandler}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TodoApp;
