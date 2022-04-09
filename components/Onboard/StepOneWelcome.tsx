import { MouseEventHandler } from 'react';
import Button from 'components/_common/Button';
import Paragraph from 'components/_typography/Paragraph';
import Title from 'components/_typography/Title';
import { ROUTES } from 'constant/routes';
import { ButtonVariant } from 'types/Button';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const StepOneWelcome: React.FC<Props> = ({ onClick }) => (
  <div className="w-full h-full flex flex-col space-y-10 justify-center items-center">
    <Title>Welcome to Archetype</Title>
    <Paragraph level={2}>Get started with Archetype in 2 steps</Paragraph>
    <div className="w-full flex flex-col space-y-[24px] justify-center items-center mt-[40px]">
      <Button onClick={onClick} className="!px-[50px]">
        Start
      </Button>
      <Button
        className="!text-tblack-200 hover:!text-tblue-700"
        variant={ButtonVariant.link}
        url={ROUTES.DASHBOARD.DASHBOARD}
      >
        Skip to dashboard
      </Button>
    </div>
  </div>
);

export default StepOneWelcome;
