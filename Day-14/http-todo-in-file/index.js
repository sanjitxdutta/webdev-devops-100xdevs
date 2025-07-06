const express = require("express");
const fs = require("fs");
const app = express();

let TODOS = [];
const filePath = "./task.json";

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
}

const data = fs.readFileSync(filePath, "utf-8");
TODOS = JSON.parse(data);

const saveTodosToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(TODOS, null, 2), "utf-8");
};

const displayTodo = () => {
    const totalTask = TODOS.length;
    let notDone = 0;
    TODOS.forEach((task) => {
        if (task.status === false) notDone++;
    });
    let done = totalTask - notDone;
    content = {
        TODOS,
        totalTask,
        done,
        notDone
    };
    return content;
}

const addTodo = (task) => {
    content = {
        id: TODOS.length + 1,
        task: task,
        status: false,
    }
    TODOS.push(content);
    saveTodosToFile();
}

const updateTodo = (taskName, newStatus) => {
    const taskToUpdate = TODOS.find(todo => todo.task === taskName);

    if (!taskToUpdate) {
        return null; // task not found
    }

    taskToUpdate.status = newStatus;
    saveTodosToFile();
    return taskToUpdate;
};

const deleteTodo = (taskName) => {
    const index = TODOS.findIndex(todo => todo.task === taskName);
    if (index === -1) {
        return false; // Not found
    }
    TODOS.splice(index, 1); // Remove from array
    saveTodosToFile();
    return true;
};


app.get("/", (req, res) => {
    const content = displayTodo();
    res.status(200).json(content);
});

app.use(express.json());

app.post("/", (req, res) => {
    const task = req.body.task;
    addTodo(task);
    res.status(201).json({
        msg: "Done!"
    })
});

app.put("/", (req, res) => {
    const { task, status } = req.body;

    const updatedTask = updateTodo(task, status);

    if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });

});

app.delete("/", (req, res) => {
    const taskName = req.query.task;

    const isDeleted = deleteTodo(taskName);

    if (!isDeleted) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully"});
});

app.listen(3000);