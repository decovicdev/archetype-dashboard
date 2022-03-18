import { TypographyVariant } from 'types/Typography';

type Props = {
  variant?: TypographyVariant;
  className?: string;
};

const Title: React.FC<Props> = ({ children, variant, className }) => (
  <h1
    className={`text-4xl leading-7 w-full text-center font-semibold font-sans ${variant} ${
      className || ''
    }`}
  >
    {children}
  </h1>
);

Title.defaultProps = {
  variant: TypographyVariant.light
};

export default Title;
