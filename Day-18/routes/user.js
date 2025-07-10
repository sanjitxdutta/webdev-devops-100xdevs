const { Router } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().min(1),
        lastName: z.string().min(1)
    });

    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.errors
        });
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.status(200).json({
            message: "Signup Successful."
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(200).json({
            message: "Email already exists in the database."
        });
    }
})

userRouter.post("/login", async function (req, res) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.errors
        });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    });

    if (!user) {
        res.status(403).json({
            message: "User does not exist in our db"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET_USER);

        res.status(200).json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials."
        })
    }
})

userRouter.get("/purchases", userMiddleware, async function (req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });

    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    });

    res.status(200).json({
        courseData
    });
})

module.exports = {
    userRouter: userRouter
}