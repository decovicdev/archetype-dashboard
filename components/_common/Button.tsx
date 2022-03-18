import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { ButtonVariant } from 'types/Button';

const styles = {
  [ButtonVariant.primary]: 'bg-tblue-700 text-white',
  [ButtonVariant.outlined]:
    'bg-white text-tblue-700 border border-solid border-tblack-100',
  [ButtonVariant.link]: 'bg-transparent text-tblue-700'
};

type Props = {
  leftIcon?: React.ReactElement;
  variant?: ButtonVariant;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  url?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({
  children,
  leftIcon,
  variant,
  className,
  onClick,
  url,
  ...props
}) =>
  url ? (
    <Link href={url}>
      <a
        className={`flex justify-center items-center rounded py-2 px-4 font-sans font-normal transition-all ${
          variant ? styles[variant] : ''
        } ${className || ''}`}
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
      className={`flex justify-center items-center rounded py-2 px-4 font-sans font-normal transition-all ${
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
  variant: ButtonVariant.primary
};

export default Button;
