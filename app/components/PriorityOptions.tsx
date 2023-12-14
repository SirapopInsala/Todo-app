import React from 'react';

interface PriorityOptionsProps {
  setPriority: (priority: string) => void;
}

const PriorityOptions: React.FC<PriorityOptionsProps> = ({ setPriority }) => {
  const handleClick = (priority: string) => {
    setPriority(priority);
  };

  return (
    <div>
      <label htmlFor="priority" className='text-black'>Priority</label>
      <select
        id="priority"
        value=""
        onChange={(e) => setPriority(e.target.value)}
        className="input input-bordered w-full bg-white text-black"
      >
        <option value="">Select Priority</option>
        <option value="High Priority">High Priority</option>
        <option value="Normal Priority">Normal Priority</option>
        <option value="Low Priority">Low Priority</option>
      </select>
    </div>
  );
};

export default PriorityOptions;
