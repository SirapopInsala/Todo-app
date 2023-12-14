"use client";

import { CiCirclePlus } from "react-icons/ci";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import PriorityOptions from "./PriorityOptions";

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>('');
    const [newPriority, setNewPriority] = useState<string>('');
    const [newDone, setNewDone] = useState<boolean>(false);

    // Form submission handler
    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {e.preventDefault();
        // Add new task using the addTodo function from the API
        await addTodo({
          id: uuidv4(),
          title: newTitle,
          text: newTaskValue,
          priority:newPriority,
          done: newDone
        });
        // Reset form input values
        setNewTaskValue("");
        setNewTitle("");
        setNewPriority('');
        // Close the modal
        setModalOpen(false);
        setNewDone(newDone);
        router.refresh(); // Refresh the page using Next.js router
    };
    return (
    <div>
        {/* Button to trigger the modal */}
        <button onClick={() => setModalOpen(true)} className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {/* Icon for the "New Task" button */}
          <CiCirclePlus className='ml-2'size={25} />
          NEW TASK
        </button>
        {/* Modal component */}
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          {/* Form for adding a new task */}
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg text-center text-black">Add new task</h3>
            <div className="mb-5">
              {/* Priority selection */}
              <PriorityOptions setPriority={setNewPriority} />
            </div>
            <div className="mb-5 text-black">
              <p>Title</p>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} type="title" placeholder="Type here" className="input input-bordered w-full bg-white" />
            </div>
            <div className="mb-5 text-black">
              <p>Description</p>
              <input value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full bg-white" />
            </div>
            <div className="flex justify-center items-center">
              {/* Submit button */}
              <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>           
          </form>
        </Modal>
    </div>
  )
}

export default AddTask