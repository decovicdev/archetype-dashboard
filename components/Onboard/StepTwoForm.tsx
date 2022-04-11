import { useFormContext } from 'react-hook-form';
import { MouseEventHandler } from 'react';
import Input from 'components/_common/Input';
import Title from 'components/_typography/Title';
import Button from 'components/_common/Button';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const StepTwoForm: React.FC<Props> = ({ onClick, disabled }) => {
  const { register } = useFormContext();

  return (
    <div className="w-full h-full flex flex-col space-y-10 justify-center items-center">
      <Title className="!text-left" level={3}>
        1. Set up your API
      </Title>
      <Input
        autoComplete="name"
        placeholder="Api Name"
        label="Name"
        disabled={disabled}
        {...register('name', { required: true })}
      />
      <Input
        placeholder="Company Name"
        label="Company"
        disabled={disabled}
        {...register('company', { required: true })}
      />
      <Input
        placeholder="Base URL"
        label="Base URL"
        disabled={disabled}
        {...register('url', { required: true })}
      />
      <Button type="button" onClick={onClick}>
        Next
      </Button>
    </div>
  );
};

export default StepTwoForm;
