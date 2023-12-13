"use client";

import { CiCirclePlus } from "react-icons/ci";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>('');
    const [newPriority, setNewPriority] = useState<string>('');
    const [newDone, setNewDone] = useState<boolean>(false);

    // Form submission handler
    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = 
    async (e) => {
        e.preventDefault();
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
        setNewPriority("");
        // Close the modal
        setModalOpen(false);
        setNewDone(false);
        router.refresh(); // Refresh the page using Next.js router
    };
    return (
    <div>
        {/* Button to trigger the modal */}
        <button onClick={() => setModalOpen(true)} className="btn btn-active btn-primary text-white mr-auto">
          {/* Icon for the "New Task" button */}
          <CiCirclePlus className='ml-2'size={25} />
          NEW TASK
        </button>
        {/* Modal component */}
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          {/* Form for adding a new task */}
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Add new task</h3>
            <div>
              {/* Priority selection */}
              <p>Priority</p>
              <ul className="menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
                <details open>
                  <summary>Priority</summary>
                    <li><a><span>High Priority</span></a></li>
                    <li><a><span>Normal Priority</span></a></li>
                    <li><a><span>Low Priority</span></a></li>
                </details>
              </ul>
            </div>
            <div className="">
              <p>Title</p>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} type="title" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            <div className="">
              <p>Description</p>
              <input value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            {/* Submit button */}
            <button type="submit" className="btn">Submit</button>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask