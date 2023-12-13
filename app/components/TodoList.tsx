import { ITask } from "@/types/task"
import Task from "./Task"

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
        <tbody className="block border-none bg-rose-500 text-white">
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
        <tbody className="block border-none bg-green-500 text-white">
            {/* Map through "Done" tasks and render each Task component */}
            {doneTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList