import SpinnerIcon from 'components/_icons/SpinnerIcon';

const Spinner: React.FC = () => (
  <div className="w-full h-full flex justify-center items-center relative">
    <SpinnerIcon className="text-tpurple-700 w-40 h-40" />
  </div>
);

export default Spinner;
