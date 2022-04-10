import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { ButtonVariant } from 'types/Button';

const styles = {
  [ButtonVariant.primary]: 'bg-tblue-700 text-white py-2',
  [ButtonVariant.outlined]:
    'bg-white text-tblue-700 border border-solid border-tblack-100 py-2',
  [ButtonVariant.link]: 'bg-transparent text-tblue-700 py-2',
  [ButtonVariant.navLink]:
    'bg-transparent text-twhite-600 hover:text-white hover:bg-tgreen-400 transiation-all py-3',
  [ButtonVariant.danger]:
    'bg-red-400 text-twhite-600 hover:text-white hover:bg-red-500 transiation-all py-3'
};

const activeStyles = {
  [ButtonVariant.primary]: 'bg-tblue-700 text-white py-2',
  [ButtonVariant.outlined]:
    'bg-white text-tblue-700 border border-solid border-tblack-100 py-2',
  [ButtonVariant.link]: 'bg-transparent text-tblue-700 py-2',
  [ButtonVariant.navLink]: 'text-white bg-tgreen-400 transiation-all py-3'
};

type Props = {
  leftIcon?: React.ReactElement;
  variant?: ButtonVariant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  url?: string;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({
  children,
  leftIcon,
  variant,
  className,
  onClick,
  url,
  active,
  ...props
}) =>
  url ? (
    <Link href={url}>
      <a
        className={`group flex justify-center items-center rounded px-4 font-sans font-normal transition-all ${
          className || ''
        } ${active ? activeStyles[variant] : styles[variant]}`}
        {...props}
      >
        {leftIcon ? (
          <leftIcon.type
            {...leftIcon.props}
            className={`${leftIcon.props.className} mr-1`}
          />
        ) : null}
        {children}
      </a>
    </Link>
  ) : (
    <button
      className={`group flex justify-center items-center rounded px-4 font-sans font-normal transition-all ${
        variant ? styles[variant] : ''
      } ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {leftIcon ? (
        <leftIcon.type
          {...leftIcon.props}
          className={`${leftIcon.props.className} mr-1`}
        />
      ) : null}
      {children}
    </button>
  );

Button.defaultProps = {
  variant: ButtonVariant.primary,
  type: 'button'
};

export default Button;
