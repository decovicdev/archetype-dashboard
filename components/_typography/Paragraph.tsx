import { TypographyVariant } from 'types/Typography';

type Props = {
  className?: string;
  variant?: TypographyVariant;
  level?: number;
};

const levels = {
  1: 'text-2xl leading-6',
  2: 'text-base',
  3: 'text-sm'
};

const Paragraph: React.FC<Props> = ({
  children,
  className,
  variant,
  level
}) => (
  <p
    className={`w-full font-normal font-sans m-0 p-0 ${
      levels[level]
    } ${variant} ${className || 'text-center'}`}
  >
    {children}
  </p>
);

Paragraph.defaultProps = {
  variant: TypographyVariant.light,
  level: 1
};

export default Paragraph;
