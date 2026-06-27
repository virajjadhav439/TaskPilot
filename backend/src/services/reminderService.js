const Task = require("../models/Task");
const User = require("../models/User");
const sendReminderEmail = require("./mailService");

const runReminderService = async () => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tasks = await Task.find({
            status: "pending",
            dueDate: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        const groupedTasks = {};

        // Group tasks by user
        for (const task of tasks) {

            const userId = task.user.toString();

            if (!groupedTasks[userId]) {
                groupedTasks[userId] = [];
            }

            groupedTasks[userId].push(task);

        }

        // Send one email per user
        for (const userId in groupedTasks) {

            const user = await User.findById(userId);

            if (!user) continue;

            await sendReminderEmail(
                user.email,
                groupedTasks[userId]
            );

            console.log(`Reminder sent to ${user.email}`);

        }

    } catch (error) {

        console.log(error.message);

    }

};

module.exports = runReminderService;