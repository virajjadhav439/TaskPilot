const { body } = require("express-validator");

const createTaskValidation = [
    body("title").trim().notEmpty().withMessage("Title is required").isLength({ min:3 }).withMessage("Title must be at least 3 characters"),
    body("priority").optional().isIn(["low","medium","high"]).withMessage("Invalid Priority"),
    body("status").optional().isIn(["pending","completed"]).withMessage("Invalid Status"),
];

module.exports = {createTaskValidation}