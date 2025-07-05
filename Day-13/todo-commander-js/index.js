const fs = require("fs");
const filePath = "./task.json";
let taskId = 0;
let taskList = [];

const { Command } = require("commander");
const program = new Command();

program
    .name("file-related-cli")
    .description("CLI to manage tasks")
    .version("0.8.0");

program.command("add-todo")
    .description("Add your task to file")
    .argument("<task>", "Task name to add")
    .action((taskName) => {
        taskName = taskName.toLowerCase();

        // Read existing file
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, "utf-8");
                if (data) {
                    taskList = JSON.parse(data);
                    // Set taskId based on last ID
                    const lastTask = taskList[taskList.length - 1];
                    taskId = lastTask ? lastTask.id + 1 : 0;
                }
            } catch (err) {
                console.error("Error reading task file:", err);
                return;
            }
        }

        const newTask = {
            id: taskId,
            task: taskName,
            done: false
        };

        taskList.push(newTask);

        fs.writeFile(filePath, JSON.stringify(taskList, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
            } else {
                console.log(`"${taskName}" added to the schedule`);
            }
        });
    });

program.command("delete-todo")
    .description("Delete your task to file")
    .argument("<task>", "Task name to add")
    .action((taskName) => {
        taskName = taskName.toLowerCase();

        // Read existing file
        if (!fs.existsSync(filePath)) {
            console.log("No task file found!");
            return;
        }

        try {
            const data = fs.readFileSync(filePath, "utf-8");
            taskList = JSON.parse(data);

            const initialLength = taskList.length;

            TASKS = taskList.filter((tasks) => {
                return tasks.task !== taskName;
            });

            if (TASKS.length === initialLength) {
                console.log("No such task found in the list!");
                return;
            }

            fs.writeFile(filePath, JSON.stringify(TASKS, null, 2), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log(`"${taskName}" deleted from the schedule`);
                }
            });
        } catch (err) {
            console.error("Error reading or writing task file:", err);
        }
    });

program.command("update-todo")
    .description("Update your task in the file")
    .argument("<oldTask>", "Old task name to update")
    .argument("<newTask>", "New task name to replace with")
    .action((oldTask, newTask) => {
        oldTask = oldTask.toLowerCase();
        newTask = newTask.toLowerCase();

        // Read existing file
        if (!fs.existsSync(filePath)) {
            console.log("No task file found!");
            return;
        }

        try {
            const data = fs.readFileSync(filePath, "utf-8");
            taskList = JSON.parse(data);

            let taskFound = false;

            const updatedTasks = taskList.map(task => {
                if (task.task === oldTask) {
                    task.task = newTask;
                    taskFound = true;
                }
                return task;
            });

            if (!taskFound) {
                console.log(`No such task named "${oldTask}" found.`);
                return;
            }

            fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log(`Task "${oldTask}" updated to "${newTask}".`);
                }
            });
        } catch (err) {
            console.error("Error reading or writing task file:", err);
        }
    });

program.command("update-status")
    .description("Update the done status of a task")
    .argument("<taskName>", "Task name to update")
    .argument("<status>", "New status: true or false")
    .action((taskName, status) => {
        taskName = taskName.toLowerCase();
        const newStatus = status.toLowerCase() === "true";

        // Read existing file
        if (!fs.existsSync(filePath)) {
            console.log("No task file found!");
            return;
        }

        try {
            const data = fs.readFileSync(filePath, "utf-8");
            taskList = JSON.parse(data);

            let taskFound = false;

            const updatedTasks = taskList.map(task => {
                if (task.task === taskName) {
                    task.done = newStatus;
                    taskFound = true;
                }
                return task;
            });

            if (!taskFound) {
                console.log(`No such task named "${taskName}" found.`);
                return;
            }

            fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log(`Task "${taskName}" status updated to "${newStatus}".`);
                }
            });
        } catch (err) {
            console.error("Error reading or writing task file:", err);
        }
    });

program.command("list-todos")
    .description("Print the task list from the file")
    .action(() => {
        // Read existing file
        if (!fs.existsSync(filePath)) {
            console.log("No task file found!");
            return;
        }

        try {
            const data = fs.readFileSync(filePath, "utf-8");
            taskList = JSON.parse(data);

            if (taskList.length === 0) {
                console.log("Task list is empty.");
                return;
            }

            console.log("\n📝 Task List:\n");

            taskList.forEach((task, index) => {
                const status = task.done ? "✅ Done" : "❌ Not Done";
                console.log(`${index + 1}. ${task.task} [${status}]`);
            });

            console.log("\nTotal tasks:", taskList.length);

        } catch (err) {
            console.error("Error reading task file:", err);
        }
    });

program.parse();
