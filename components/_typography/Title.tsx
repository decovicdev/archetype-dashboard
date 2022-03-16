import { TypographyVariant } from 'types/Typography';

type Props = {
  variant?: TypographyVariant;
};

const Title: React.FC<Props> = ({ children, variant }) => (
  <h1
    className={`text-4xl leading-7 w-full text-center font-semibold font-sans ${variant}`}
  >
    {children}
  </h1>
);

Title.defaultProps = {
  variant: TypographyVariant.light
};

export default Title;
