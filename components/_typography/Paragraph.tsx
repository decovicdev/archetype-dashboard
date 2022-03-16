import { TypographyVariant } from 'types/Typography';

type Props = {
  className?: string;
  variant?: TypographyVariant;
  level?: number;
};

const levels = {
  1: 'text-2xl leading-6',
  2: 'text-base'
};

const Paragraph: React.FC<Props> = ({
  children,
  className,
  variant,
  level
}) => (
  <p
    className={`w-full text-center font-normal text-white font-sans m-0 p-0 ${levels[level]} ${variant} ${className}`}
  >
    {children}
  </p>
);

Paragraph.defaultProps = {
  variant: TypographyVariant.light,
  level: 1
};

export default Paragraph;
