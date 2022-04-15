import { useRef, useState, useEffect, ReactNode } from 'react';
import ChevronDown from 'components/_icons/ChevronDown';

export type Option = { label: string; value: string | number };
type Props = {
  className?: string;
  innerClassName?: string;
  placeholder?: string;
  value?: Option;
  label?: ReactNode;
  options: Option[];
  onChange?: (option?: Option) => void;
};

const Dropdown: React.FC<Props> = ({
  className,
  placeholder,
  onChange,
  value,
  label,
  innerClassName,
  options
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value?.value !== selected?.value) setSelected(value);
  }, [selected?.value, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef?.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={className} ref={dropdownRef}>
      <div className={`relative min-w-max w-full ${innerClassName}`}>
        {label ? (
          <span className="text-sm text-tblack-400 mb-3 font-sans">
            {label}
          </span>
        ) : null}
        <button
          type="button"
          className={`rounded-md bg-white py-3 px-4 w-full flex justify-between items-center group ${
            selected ? 'text-tblack-700' : 'text-tblack-200'
          }`}
          onClick={() => setOpen(!isOpen)}
        >
          {selected ? selected.label : placeholder}
          <ChevronDown className="text-tblack-300 group-hover:text-tblack-700" />
        </button>
        <div
          className={`min-w-max absolute w-full bg-white z-50 py-2 text-left rounded-lg shadow-lg mt-1 m-0 ${
            isOpen ? '' : 'hidden'
          }`}
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.label}
              className="py-2 px-4 w-full bg-transparent text-tblack-200 hover:text-tblack-700 hover:bg-tblack-100"
              onClick={() => {
                setSelected(option);
                if (onChange) {
                  onChange(option);
                }
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dropdown;
