type Props = {
  className?: string;
  level?: number;
};

const levels = {
  1: 'text-2xl leading-6',
  2: 'text-base',
  3: 'text-sm'
};

const SuccessText: React.FC<Props> = ({ children, className, level }) => (
  <p
    className={`w-full text-center font-normal text-green-700 font-sans m-0 p-0 !my-1 ${levels[level]} ${className}`}
  >
    {children}
  </p>
);

SuccessText.defaultProps = {
  level: 3
};

export default SuccessText;
