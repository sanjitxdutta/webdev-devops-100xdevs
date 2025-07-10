const { Router } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
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
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.status(200).json({
            message: "Signup Successful."
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(200).json({
            message: "Email already exists in the database."
        });
    }
});

adminRouter.post("/login", async function (req, res) {
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

    const admin = await adminModel.findOne({
        email: email
    });

    if (!admin) {
        res.status(403).json({
            message: "User does not exist in our db"
        });
        return;
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id
        }, process.env.JWT_SECRET_ADMIN);

        res.status(200).json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials."
        });
    }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    });

    res.status(200).json({
        message: "Course created.",
        courseId: course._id
    });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    });

    if (course) {
        res.status(200).json({
            message: "Course updated.",
            courseId: course._id
        });
    } else {
        res.status(404).json({
            message: "Something is wrong."
        });
    }
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.status(200).json({
        courses
    });
});

module.exports = {
    adminRouter: adminRouter
};
