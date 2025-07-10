const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");
const { z } = require("zod");

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
    const schema = z.object({
        courseId: z.string().min(1)
    });

    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.errors
        });
    }

    const userId = req.userId;
    const courseId = req.body.courseId;

    // Payment check

    await purchaseModel.create({
        userId,
        courseId
    });

    res.status(200).json({
        message: "Your have successfully purchased the course."
    });
});

courseRouter.get("/preview", async function (req, res) {
    const courses = await courseModel.find({});

    res.json({
        courses
    });
});

module.exports = {
    courseRouter: courseRouter
};
