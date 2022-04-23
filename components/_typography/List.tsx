type Props = {
  className?: string;
};

const List: React.FC<Props> = ({ children, className }) => (
  <ul
    className={`text-2xl leading-6 w-full text-left font-normal text-white font-sans list-disc list-inside ${
      className || ''
    }`}
  >
    {children}
  </ul>
);

export default List;
