type Props = {
  className?: string;
  level?: number;
};

const levels = {
  1: 'text-2xl leading-6',
  2: 'text-base',
  3: 'text-sm'
};

const ErrorText: React.FC<Props> = ({ children, className, level }) => (
  <p
    className={`w-full text-left font-normal text-red-500 font-sans m-0 p-0 !my-1 ${levels[level]} ${className}`}
  >
    {children}
  </p>
);

ErrorText.defaultProps = {
  level: 3
};

export default ErrorText;
