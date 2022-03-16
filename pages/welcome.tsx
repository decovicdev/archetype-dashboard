import type { NextPage } from 'next';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import OnboardingLayout from 'components/_common/OnboardingLayout';
import Title from 'components/_typography/Title';
import Paragraph from 'components/_typography/Paragraph';
import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
// import PrivateRoute from 'components/_common/PrivateRoute';

const WelcomePage: NextPage = () => (
  //   <PrivateRoute>
  <OnboardingLayout>
    <div className="w-full h-full flex flex-col space-y-[80px] justify-center items-center">
      <ArcheTypeLogo />
      <Title>Welcome to Archetype</Title>
      <Paragraph>Get started with Archetype in 2 steps</Paragraph>
      <div className="w-full flex flex-col space-y-[24px] justify-center items-center mt-[40px]">
        <Button className="!px-[50px]">Start</Button>
        <Button
          className="!text-tblack-200 hover:!text-tblue-700"
          variant={ButtonVariant.link}
        >
          Skip to dashboard
        </Button>
      </div>
    </div>
  </OnboardingLayout>
  //   </PrivateRoute>
);

export default WelcomePage;
