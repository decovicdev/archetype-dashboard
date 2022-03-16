type Props = {
  className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => (
  <div
    className={`bg-white rounded text-tblack-700 p-7 shadow-tblack ${
      className || ''
    }`}
  >
    {children}
  </div>
);

export default Card;
