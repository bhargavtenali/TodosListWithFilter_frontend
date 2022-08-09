import "./index.css";

function TaskItem({ item, deleteTodoHandler, changeTodoCompleteHandler }) {
    return (
        <div>
            <input
                id={item.id}
                type="checkbox"
                checked={item.isComplete}
                onChange={() => changeTodoCompleteHandler(item.id)}
            />
            <label
                htmlFor={item.id}
                className={item.isComplete ? "completeClass" : "incompleteClass"}
            >
                {item.input}
            </label>
            {"   "}
            <button onClick={() => deleteTodoHandler(item.id)}>Delete</button>
        </div>
    );
}

export default TaskItem;
