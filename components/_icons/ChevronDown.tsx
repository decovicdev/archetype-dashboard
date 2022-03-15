type Props = {
  className?: string;
};

const ChevronDown: React.FC<Props> = ({ className = '' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.12872 9L12.0002 12.863L15.8716 9L17.0609 10.1893L12.0002 15.25L6.93945 10.1893L8.12872 9Z"
      fill="currentColor"
    />
    <mask
      id="mask0_176_37955"
      maskUnits="userSpaceOnUse"
      x="6"
      y="9"
      width="12"
      height="7"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.12872 9L12.0002 12.863L15.8716 9L17.0609 10.1893L12.0002 15.25L6.93945 10.1893L8.12872 9Z"
        fill="white"
      />
    </mask>
  </svg>
);

export default ChevronDown;
