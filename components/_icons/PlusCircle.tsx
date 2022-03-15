type Props = {
  className?: string;
};

const PlusCircle: React.FC<Props> = ({ className = '' }) => (
  <svg
    width="20"
    height="20"
    viewBox="10 10 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="19"
      cy="19.5"
      r="8.75"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M22.9656 19.435H14.9046"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.9351 15.4045V23.4656"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusCircle;
