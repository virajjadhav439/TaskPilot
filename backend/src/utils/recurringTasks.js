const getNextDueDate = (dueDate,recurringTask)=>{
    const nextDate = new Date(dueDate)

    if (recurringTask === "daily") {
        nextDate.setDate(nextDate.getDate()+1)
    }
    if (recurringTask === "weekly") {
        nextDate.setDate(nextDate.getDate()+7)
    }
    if (recurringTask === "monthly") {
        nextDate.setDate(nextDate.getMonth()+1)
    }
    return nextDate
}

module.exports = getNextDueDate