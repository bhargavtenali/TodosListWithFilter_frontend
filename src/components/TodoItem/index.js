import "./index.css";

function TaskItem({ item, deleteTodoHandler, changeTodoCompleteHandler }) {
    const { name, description, time, isComplete } = item
    return (
        <div className="todoItemContainer">
            <input
                className="checkBox"
                id={item.id}
                type="checkbox"
                checked={isComplete}
                onChange={() => changeTodoCompleteHandler(item.id)}
            />
            <label
                htmlFor={item.id}
                className={isComplete ? "labelStyleChild completeClass" : "labelStyleChild incompleteClass"}
            >
                <p className="text1" >{name}</p>
                <p className="text" >{description}</p>
                <p className="text2" >{time}</p>
            </label>
            {"   "}
            <button className="button2" onClick={() => deleteTodoHandler(item.id)}>Delete</button>
        </div>
    );
}

export default TaskItem;
