import TaskCard from "../task/TaskCard";

const TaskListForDay = ({ tasks, fetchTasks }) => {

  if (tasks.length === 0) {
    return (
      <p className="mt-6 text-gray-500">
        No tasks for this day.
      </p>
    );
  }
  
  return (
    <div className="space-y-4 mt-6">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          fetchTasks={fetchTasks}
        />
      ))}
    </div>
  );
};

export default TaskListForDay;