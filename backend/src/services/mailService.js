const nodemailer = require("nodemailer");

// Create Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify Transporter
const verifyTransporter = async () => {
    try {
        await transporter.verify();
        console.log("Mail Server Ready");
    } catch (error) {
        console.log("Verification Failed", error);
    }
};

verifyTransporter();

// Send Reminder Email
const sendReminderEmail = async (email, tasks) => {

    const taskList = tasks
        .map((task) => {
            return `
• ${task.title}
  Priority : ${task.priority}
  Due Date : ${task.dueDate}
`;
        })
        .join("\n");

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `TaskPilot - Today's Task Reminder`,
        text: `
Hello,

You have ${tasks.length} pending task(s) due today.

${taskList}

Stay productive! 🚀

Regards,
TaskPilot
`,
    };

    try {

        const info = await transporter.sendMail(mailOptions);

        console.log("Email Sent:", info.response);

    } catch (error) {

        console.log("Email Failed:", error);

    }

};

module.exports = sendReminderEmail;