const getNextDueDate = (dueDate, recurringType) => {

    if(!dueDate){
        return null
    }

    const nextDate = new Date(dueDate)

    if(recurringType === "daily"){
        nextDate.setDate(
            nextDate.getDate() + 1
        )
    }

    if(recurringType === "weekly"){
        nextDate.setDate(
            nextDate.getDate() + 7
        )
    }

    if(recurringType === "monthly"){
        nextDate.setMonth(
            nextDate.getMonth() + 1
        )
    }

    return nextDate
}

module.exports = getNextDueDate