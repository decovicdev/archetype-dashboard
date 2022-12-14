import { ReactNode, useEffect, useState } from 'react';

type Props = {
  checked?: boolean;
  label?: ReactNode;
  className?: string;
  onChange?: (isChecked: boolean) => void;
};
const Switch: React.FC<Props> = ({
  checked,
  className,
  label,
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => setIsChecked(checked), [checked]);

  return (
    <div className={`flex items-center space-x-2 py-2 ${className}`}>
      <button
        type="button"
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
      {label ? (
        <span className="text-sm text-tblack-400 font-sans">{label}</span>
      ) : null}
    </div>
  );
};

export default Switch;
