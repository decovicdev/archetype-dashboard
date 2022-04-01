import { useState } from 'react';

const Switch: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <button
      className={`w-10 p-1 rounded-2xl flex items-center ${
        isChecked ? 'bg-tblue-700' : 'bg-tblack-100'
      }`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <input type="checkbox" hidden defaultChecked={isChecked} />
      <span
        className={`w-4 h-4 rounded-full bg-white transition-all transform ${
          isChecked ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Switch;
