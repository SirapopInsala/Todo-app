import { ITask } from "@/types/task"
import Task from "./Task"
import DoneTask from "./DoneTask";

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  
  // Separate tasks into "Todo" and "Done"
  const todoTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);
  
  return (
    <div>
      {/* Table to display tasks */}
      <table className="table">
        {/* Table header for Todo Tasks */}
        <thead>
          <tr>
            <th className="text-xl text-center">Todo Tasks</th>
          </tr>
        </thead>
        {/* Table body for Todo Tasks */}
        <tbody className="block">
            {/* Map through "Todo" tasks and render each Task component */}
            {todoTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
        </tbody>
        {/* Table header for Done Tasks */}
        <thead>
          <tr>
            <th className="text-xl text-center">Done Tasks</th>
          </tr>
        </thead>
        {/* Table body for Done Tasks */}
        <tbody className="block">
            {/* Map through "Done" tasks and render each Task component */}
            {doneTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            {/* Example of rendering a DoneTask component (you can replace it with your actual DoneTask component) */}
            <DoneTask />
        </tbody>
      </table>
    </div>
  )
}

export default TodoList