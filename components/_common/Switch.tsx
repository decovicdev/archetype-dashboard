import { useState } from 'react';

type Props = {
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
};
const Switch: React.FC<Props> = ({ checked, onChange, ...props }) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <button
      className={`w-10 p-1 rounded-2xl flex items-center ${
        isChecked ? 'bg-tblue-700' : 'bg-tblack-100'
      }`}
      onClick={() => {
        setIsChecked(!isChecked);
        if (onChange) {
          onChange(!isChecked);
        }
      }}
    >
      <input type="checkbox" hidden defaultChecked={isChecked} {...props} />
      <span
        className={`w-4 h-4 rounded-full bg-white transition-all transform ${
          isChecked ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Switch;
