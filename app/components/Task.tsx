"use client";

import { ITask } from "@/types/task";
import { FormEventHandler, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import PriorityOptions from "./PriorityOptions";

interface TaskProps {
    task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    // Initialize router from Next.js
    const router = useRouter();
    // State variables for managing modal and task details
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const [newTitle, setNewTitle] = useState<string>(task.title);
    const [newPriority, setNewPriority] = useState<string>(task.priority);
    const [newDone, setNewDone] = useState<boolean>(task.done);

    // Priority color mapping
    const priorityColors: { [key: string]: string } = {
      'High Priority': 'red',
      'Normal Priority': 'orange',
      'Low Priority': 'yellow',
    };

    // Handle form submission for editing task
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            title: newTitle,
            text: taskToEdit,
            priority: newPriority,
            done: newDone,
        });
        // Reset form and close modal after submission
        setTaskToEdit("");
        setNewTitle("");
        setNewPriority("");
        setOpenModalEdit(false);
        setNewDone(false);
        // Refresh the page using Next.js router
        router.refresh();
    };

    // Handle task deletion
    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        // Close the modal after deletion
        setOpenModalDeleted(false);
        // Refresh the page using Next.js router
        router.refresh();
    };

    // Toggle the 'done' status and update the task
    const handleDoneTask = async () => {
        // Toggle the 'done' status
        setNewDone(!newDone);
        // Update the task with the new 'done' status
        await editTodo({
            id: task.id,
            title: task.title,
            text: task.text,
            priority: task.priority,
            done: !newDone,
        });
        // Refresh the page using Next.js router
        router.refresh();
    };

    return (
          <tr key={task.id} className="rounded-lg">
          {/* Task details */}
          <td className="w-full">
              {/* Display priority badge based on priority level */}
              <p className={`text-xs badge ${priorityColors[newPriority.toLowerCase()]}`}>
                  {task.priority}
              </p>
              {/* Display task title */}
              <p className="text-lg font-bold">{task.title}</p>
              {/* Display task description */}
              {task.text}
          </td>

          {/* Checkbox for marking task as done */}
          <td>
              <label className="inline-flex items-center">
                  <input
                      type="checkbox"
                      className={`form-checkbox h-5 w-5 text-${newDone ? 'green' : 'blue'}-500 border-gray-300 rounded-full`}
                      checked={newDone}
                      onChange={handleDoneTask}
                  />
                  <span className="ml-2 text-gray-700"></span>
              </label>
          </td>

          {/* Actions for editing and deleting tasks */}
          <td className="gap-6 menu menu-horizontal">
              {/* Edit button with modal */}
              <FaEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" size={25} />
              {/* Modal for editing task */}
              <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                  {/* Form for editing task */}
                  <form className="gap-4" onSubmit={handleSubmitEditTodo}>
                    <h3 className="font-bold text-lg">Edit</h3>
                    {/* Display priority options using PriorityOptions component */}
                    <div>
                      <PriorityOptions setPriority={setNewPriority} />
                    </div>

                    {/* Input for task title */}
                    <div>
                      <p>Title</p>
                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        type="title"
                        placeholder="Type here"
                        className="input input-bordered "
                      />
                    </div>

                    {/* Input for task description */}
                    <div>
                      <p>Description</p>
                      <input
                        value={taskToEdit}
                        onChange={(e) => setTaskToEdit(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered "
                      />
                    </div>

                    {/* Submit button for editing task */}
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  </form>
              </Modal>

              {/* Delete button with modal */}
              <FaTrashAlt onClick={() => setOpenModalDeleted(true)} cursor="pointer" size={25} />
              {/* Modal for deleting task */}
              <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                  <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
                  {/* Delete confirmation button */}
                  <div className="modal-action">
                      <button onClick={() => handleDeleteTask(task.id)} className="btn">
                          Yes
                      </button>
                  </div>
              </Modal>
          </td>
      </tr>
    );
};

export default Task;
