"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/api";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";

const DoneTask = () => {
    const router = useRouter();
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

    const handleDeleteTask = async (id:string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
      }

  return (
    <div>
        <tr>
        <td className="w-full">
        <p className="text-xs"><span className="badge">High Priority</span></p>
        <p className="text-lg font-bold">Relax Time</p>           
        wanna play the game
      </td>

      <td>
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded-full" checked={true}/>
          <span className="ml-2 text-gray-700"></span>
        </label>
      </td>

      <td>
        <FaTrashAlt onClick={() => setOpenModalDeleted(true)} cusor="pointer" size={25} />
          <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
              <div className="modal-action">
                <button className="btn">
                  Yes
                </button>
              </div>
          </Modal>
        </td>
        </tr>
    </div>
  )
}

export default DoneTask