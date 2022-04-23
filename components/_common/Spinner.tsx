import SpinnerIcon from 'components/_icons/SpinnerIcon';
import MainLayout from 'components/_layout/MainLayout';

type Props = { className?: string; fullPage?: boolean };

const Spinner: React.FC<Props> = ({ className, fullPage }) =>
  fullPage ? (
    <MainLayout>
      <div className="w-full h-full flex justify-center items-center relative">
        <SpinnerIcon
          className={`text-tpurple-700 w-40 h-40 ${className || ''}`}
        />
      </div>
    </MainLayout>
  ) : (
    <div className="w-full h-full flex justify-center items-center relative">
      <SpinnerIcon
        className={`text-tpurple-700 w-40 h-40 ${className || ''}`}
      />
    </div>
  );

export default Spinner;
