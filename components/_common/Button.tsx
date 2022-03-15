import { Variant } from 'types/Button';

const styles = {
  [Variant.primary]: 'bg-tblue-700 text-white',
  [Variant.outlined]: 'bg-white text-tblue-700 border border-tblack-100',
  [Variant.link]: 'bg-transparent text-tblue-700'
};

type Props = {
  leftIcon?: React.ReactElement;
  variant?: Variant;
};

const Button: React.FC<Props> = ({ children, leftIcon, variant, ...props }) => (
  <button
    className={`flex justify-center items-center rounded py-2 px-4 ${
      variant ? styles[variant] : ''
    }`}
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
  variant: Variant.primary
};

export default Button;
