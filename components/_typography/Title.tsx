import { TypographyVariant } from 'types/Typography';

type Props = {
  variant?: TypographyVariant;
  className?: string;
  level?: 1 | 2 | 3;
};

const levels = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl'
};

const Title: React.FC<Props> = ({
  children,
  variant,
  className,
  level = 1
}) => (
  <h1
    className={` leading-7 w-full text-center font-semibold font-sans ${
      levels[level]
    } ${variant} ${className || ''}`}
  >
    {children}
  </h1>
);

Title.defaultProps = {
  variant: TypographyVariant.light
};

export default Title;
