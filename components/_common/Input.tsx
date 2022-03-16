import { FormVariant } from 'types/Form';

type Props = {
  placeholder: string;
  variant?: FormVariant;
  label?: string;
  name: string;
  className?: string;
};

const Input: React.FC<Props> = ({
  placeholder,
  variant,
  label,
  name,
  className
}) =>
  label ? (
    <label htmlFor={name} className={`w-full ${className}`}>
      <span className="text-sm text-tblack-400 mb-3 font-sans">{label}</span>
      <input
        name={name}
        className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant}`}
        placeholder={placeholder}
      />
    </label>
  ) : (
    <input
      name={name}
      className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant} ${className}`}
      placeholder={placeholder}
    />
  );

Input.defaultProps = {
  variant: FormVariant.default
};

export default Input;
