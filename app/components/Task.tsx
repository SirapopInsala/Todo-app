"use client";

import { ITask } from "@/types/task"
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { FormEventHandler, useState } from "react";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const [newPriority, setNewPriority] = useState<string>(task.priority);
  const [newDone, setNewDone] = useState<boolean>(task.done);

  // Handle form submission for editing a task
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = 
  async (e) => {
      e.preventDefault();
      // Call API to edit task
      await editTodo({
        id: task.id,
        title: newTitle,
        text: taskToEdit,
        priority:newPriority,
        done: newDone
      });
      // Clear form fields and close modal
      setTaskToEdit("");
      setNewTitle("");
      setNewPriority("");
      setOpenModalEdit(false);
      setNewDone(false);
      router.refresh(); // Refresh the page
  }
  // Handle task deletion
  const handleDeleteTask = async (id:string) => {
    await deleteTodo(id); // Call API to delete task
    setOpenModalDeleted(false); // Close delete confirmation modal and refresh the page
    router.refresh();
  }

  return (
    <tr key={task.id}>
      {/* Display task details */}
      <td className="w-full">
        <p className="text-xs"><span className="badge">{task.priority}</span></p>
        <p className="text-lg font-bold">{task.title}</p>           
        {task.text}
      </td>
      {/* Checkbox for marking task as done */}
      <td>
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded-full" />
          <span className="ml-2 text-gray-700"></span>
        </label>
      </td>
      {/* Actions for editing and deleting tasks */}
      <td className="gap-6 menu menu-horizontal">
        {/* Edit task button */}
        <FaEdit onClick={() => setOpenModalEdit(true)} cusor="pointer" size={25} />
          {/* Modal for editing task */}
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg">Edit</h3>
              <div>
                {/* Dropdown for selecting task priority */}
                <p>Priority</p>
                <ul className="menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
                  <details>
                    <summary>Priority</summary>
                      <li><a><span>High Priority</span></a></li>
                      <li><a><span>Normal Priority</span></a></li>
                      <li><a><span>Low Priority</span></a></li>
                  </details>
                </ul>
              </div>
              {/* Input for editing task title */}
              <div>
                <p>Title</p>
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} type="title" placeholder="Type here" className="input input-bordered" />
              </div>
              {/* Input for editing task description */}
              <div>
                <p>Description</p>
                <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered" />
              </div>
              <div className="modal-action">
                {/* Submit button for editing task */}
                <button type="submit" className="btn btn-active btn-primary text-white text-center">Submit</button>
              </div>
              
            </form>
          </Modal>
          {/* Delete task button */}
          <FaTrashAlt onClick={() => setOpenModalDeleted(true)} cusor="pointer" size={25} />
          {/* Modal for confirming task deletion */}
          <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
              <div className="modal-action">
                {/* Button to confirm deletion */}
                <button onClick={() => handleDeleteTask(task.id)} className="btn btn-active btn-primary text-white">Yes</button>
              </div>
          </Modal>
        </td>
    </tr>
  )
}

export default Task