import React from 'react';

interface PriorityOptionsProps {
  setPriority: React.Dispatch<React.SetStateAction<string>>;
}

const PriorityOptions: React.FC<PriorityOptionsProps> = ({ setPriority }) => {
  const handleClick = (priority: string) => {
    setPriority(priority);
  };

  return (
    <details>
      <summary>Priority</summary>
      <ul className="menu p-2 bg-base-100 rounded-t-none">
        <li>
          <a onClick={() => handleClick('High Priority')}>
            <span>High Priority</span>
          </a>
        </li>
        <li>
          <a onClick={() => handleClick('Normal Priority')}>
            <span>Normal Priority</span>
          </a>
        </li>
        <li>
          <a onClick={() => handleClick('Low Priority')}>
            <span>Low Priority</span>
          </a>
        </li>
      </ul>
    </details>
  );
};

export default PriorityOptions;
