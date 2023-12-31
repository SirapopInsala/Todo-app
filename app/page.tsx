import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask"
import TodoList from "./components/TodoList"
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-slate-200">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div> 
          <div className="flex-1 px-2 mx-2 text-2xl text-black">Todo-app List</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li><AddTask /></li>
              <li><SignUp /></li>
              <li><LogIn /></li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <TodoList tasks={tasks} />
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-slate-200">
          {/* Sidebar content here */}
          <li className="text-2xl text-center text-black navbar w-full">Todo-app</li>
          <li className="flex justify-center items-center"><AddTask /></li>
        </ul>
      </div>
    </div>
  )
}
