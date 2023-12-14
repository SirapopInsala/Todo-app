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

    // Determine the background color based on priority
    const priorityColor = () => {
        if (task.done) {
          return 'bg-green-500'; // Green for done tasks
        }
      
        switch (task.priority) {
          case 'High Priority':
            return 'bg-red-500'; // Red for high priority
          case 'Normal Priority':
            return 'bg-orange-500'; // Orange for normal priority
          case 'Low Priority':
            return 'bg-yellow-500'; // Yellow for low priority
          default:
            return 'bg-gray-300'; // Default to gray if priority is undefined
        }
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
        setNewPriority(newPriority);
        setOpenModalEdit(false);
        setNewDone(newDone);
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

    // Determine the background color based on completion status
    const completionColor = task.done ? 'bg-green-500' : 'bg-gray-300';

    return (
        <div className={`rounded-xl p-2 border mb-2 ${priorityColor()} ${completionColor}`}>
            <tr key={task.id} className={` ${priorityColor()} ${completionColor}`}>
            {/* Task details */}
            <td className="w-full p-4">
                <p className="text-xs">{task.priority}</p>
                <p className="text-lg font-bold">{task.title}</p>
                {task.text}
            </td>

            {/* Checkbox for marking task as done */}
            <td>
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    className={`form-checkbox h-5 w-5 ${
                        newDone ? 'text-green-500' : 'text-blue-500'
                    } border-gray-300 rounded-full`}
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
                        <h3 className="font-bold text-lg text-black text-center">Edit</h3>

                        {/* Display priority options using PriorityOptions component */}
                        <div className="mb-5">
                            <PriorityOptions setPriority={setNewPriority} />
                        </div>

                        {/* Input for task title */}
                        <div className="text-black mb-5">
                            <p>Title</p>
                            <input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                type="title"
                                placeholder="Type here"
                                className="input input-bordered bg-white w-full"
                            />
                        </div>

                        {/* Input for task description */}
                        <div className="text-black mb-5">
                            <p>Description</p>
                            <input
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered bg-white w-full"
                            />
                        </div>
                        <div className="mb-5 flex justify-center items-center">
                            {/* Submit button for editing task */}
                            <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Delete button with modal */}
                <FaTrashAlt onClick={() => setOpenModalDeleted(true)} cursor="pointer" size={25} />
                {/* Modal for deleting task */}
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className="text-lg text-black">Are you sure, you want to delete this task?</h3>
                    {/* Delete confirmation button */}
                    <div className="modal-action">
                        <button onClick={() => handleDeleteTask(task.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    </div>
    );
};

export default Task;
