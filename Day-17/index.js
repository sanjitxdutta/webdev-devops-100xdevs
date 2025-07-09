const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { UserModel, TodoModel } = require("./db");
const { default: mongoose } = require("mongoose");

const JWT_SECRET = "sanjit123";

mongoose.connect("mongodb+srv://admin:epPw6KUER6K1X4Fu@cluster0.te3eafk.mongodb.net/todo-app-database")

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(20),
        name: z.string().min(3).max(20)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect format.",
            issues: parsedDataWithSuccess.error.issues
        });
        return;
    }

    let errThrow = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
        throw new Error("User already exists.");
    } catch (e) {
        console.log("Duplicate email");
        res.json({
            message: "User already Exists."
        })
        errThrow = true;
    }

    if (!errThrow) {
        res.status(200).json({
            message: "You successfully signed up!"
        })
    }
})

app.post("/login", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    });

    if (!user) {
        res.status(403).json({
            message: "User does not exist in our db"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log(user);

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials."
        })
    }
})

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const { title, done } = req.body;

    const todo = await TodoModel.create({
        title: title,
        done: done,
        userId: userId
    });

    res.status(200).json({
        message: "Todo created successfully",
        todo: todo
    });
});

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({ userId: userId });
    res.status(200).json({
        todos: todos
    });
});

app.put("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const { title, done } = req.body;

    const updatedTodo = await TodoModel.findOneAndUpdate(
        { title: title, userId: userId },
        { done: done },
        { new: true }
    );

    if (!updatedTodo) {
        res.status(404).json({
            message: "Todo not found or you are not authorized to update it"
        });
        return;
    }

    res.status(200).json({
        message: "Todo updated successfully",
        todo: updatedTodo
    });
});

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData) {
        req.userId = decodedData.id;
        next();
    } else {
        res.status(403).json({
            message: "Wrong credentials."
        })
    }
}

app.listen(3000);