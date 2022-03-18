import { forwardRef } from 'react';
import { FormVariant } from 'types/Form';

type Props = {
  placeholder: string;
  variant?: FormVariant;
  label?: string;
  name: string;
  className?: string;
};

const Input: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  function Input(
    { placeholder, variant, label, name, className, ...props },
    ref
  ) {
    return label ? (
      <label htmlFor={name} className={`w-full ${className}`}>
        <span className="text-sm text-tblack-400 mb-3 font-sans">{label}</span>
        <input
          name={name}
          className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant}`}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </label>
    ) : (
      <input
        name={name}
        className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant} ${className}`}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.defaultProps = {
  variant: FormVariant.default
};

export default Input;
