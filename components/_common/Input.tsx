import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  ReactNode
} from 'react';
import { FormVariant } from 'types/Form';

type Props = {
  placeholder: string;
  variant?: FormVariant;
  label?: ReactNode;
  name: string;
  className?: string;
  value?: string | number;
  htmlType?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>
};

const Input: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  function Input(
    {
      placeholder,
      variant,
      label,
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      disabled,
      htmlType = 'text',
      className,
      ...props
    },
    ref
  ) {
    return label ? (
      <label htmlFor={name} className={`w-full ${className}`}>
        <span className="text-sm text-tblack-400 mb-3 font-sans">{label}</span>
        <input
          name={name}
          className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant}`}
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          type={htmlType}
          disabled={disabled}
          onFocus={onFocus}
          {...props}
        />
      </label>
    ) : (
      <input
        name={name}
        className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant} ${className}`}
        placeholder={placeholder}
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type={htmlType}
        disabled={disabled}
        onFocus={onFocus}
        {...props}
      />
    );
  }
);

Input.defaultProps = {
  variant: FormVariant.default
};

export default Input;
