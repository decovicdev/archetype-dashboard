import ArcheTypeNlogo from 'components/_icons/ArchTypeNlogo';
import MainLayout from 'components/_layout/MainLayout';

const OnboardingLayout: React.FC = ({ children }) => (
  <MainLayout>
    <div className="w-full h-full flex flex-col justify-center items-center space-y-10 p-[60px] max-w-[540px] py-32 mx-auto">
      <ArcheTypeNlogo />
      {children}
    </div>
  </MainLayout>
);

export default OnboardingLayout;
