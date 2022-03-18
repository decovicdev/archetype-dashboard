import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
import MainLayout from 'components/_layout/MainLayout';
import { LogoVariant } from 'types/ArcheTypeLogo';

const OnboardingLayout: React.FC = ({ children }) => (
  <MainLayout>
    <div className="w-full h-full flex flex-col justify-center items-center space-y-10 p-[60px] max-w-[540px] py-32 mx-auto">
      <ArcheTypeLogo variant={LogoVariant.light} />
      {children}
    </div>
  </MainLayout>
);

export default OnboardingLayout;
