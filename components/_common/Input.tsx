type Props = {
  placeholder: string;
};

const Input: React.FC<Props> = ({ placeholder, ...props }) => (
  <input
    className="rounded-md bg-white text-tblack-700 placeholder:text-tblack-200 py-3 px-4"
    placeholder={placeholder}
    {...props}
  />
);

export default Input;
