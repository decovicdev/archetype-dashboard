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
  autoComplete?: string;
  value?: string | number;
  htmlType?: string;
  disabled?: boolean;
  labelClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
};

const Input: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  function Input(
    {
      variant,
      label,
      name,
      labelClassName,
      htmlType = 'text',
      className,
      ...props
    },
    ref
  ) {
    return label ? (
      <label htmlFor={name} className={`w-full ${className}`}>
        <span
          className={`text-sm mb-3 font-sans ${
            labelClassName ?? 'text-tblack-400'
          }`}
        >
          {label}
        </span>
        <input
          name={name}
          className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant}`}
          ref={ref}
          type={htmlType}
          {...props}
        />
      </label>
    ) : (
      <input
        name={name}
        className={`w-full rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4 font-sans ${variant} ${className}`}
        ref={ref}
        type={htmlType}
        {...props}
      />
    );
  }
);

Input.defaultProps = {
  variant: FormVariant.default
};

export default Input;
