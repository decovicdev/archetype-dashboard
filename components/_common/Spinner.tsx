import SpinnerIcon from 'components/_icons/SpinnerIcon';

type Props = { className?: string };

const Spinner: React.FC<Props> = ({ className }) => (
  <div className="w-full h-full flex justify-center items-center relative">
    <SpinnerIcon className={`text-tpurple-700 w-40 h-40 ${className || ''}`} />
  </div>
);

export default Spinner;
