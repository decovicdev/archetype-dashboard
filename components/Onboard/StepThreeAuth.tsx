import { useFormContext } from 'react-hook-form';
import { MouseEventHandler } from 'react';
import Button from 'components/_common/Button';
import Card from 'components/_common/Card';
import Input from 'components/_common/Input';
import Title from 'components/_typography/Title';
import { AUTH_TYPES } from 'types/Auth';
import RadioGroup from 'components/_common/RadioGroup';
import { ButtonVariant } from 'types/Button';

const AuthOptions = {
  [AUTH_TYPES.header]: {
    label: 'Header',
    description: 'Secure & traditional way to add API key'
  },
  [AUTH_TYPES.body]: {
    label: 'Body (Request)',
    description: 'Secure way to add API key'
  },
  [AUTH_TYPES.url]: {
    label: 'URL',
    description: 'Accessible via GET request'
  }
};

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const StepThreeAuth: React.FC<Props> = ({ onClick }) => {
  const { register, setValue, watch } = useFormContext();
  const auth_type: string = watch('auth_type', 'none') as string;

  return (
    <div className="w-full h-full flex flex-col space-y-10 justify-center items-center">
      <Title className="!text-left" level={3}>
        2. Set up end-user authentication
      </Title>
      <div className="w-full flex flex-col">
        <label className="text-left w-full mb-2">
          Authentication Type (For End User)
        </label>
        <div className="grid grid-cols-3 gap-x-2 relative">
          {Object.entries(AUTH_TYPES).map(([key, val]) =>
            key !== 'none' ? (
              <Card
                className={auth_type === key ? 'opacity-100' : 'opacity-70'}
                key={key}
              >
                <button
                  className="w-full flex flex-col justify-start items-start"
                  onClick={() => setValue('auth_type', key)}
                >
                  <p className="w-full text-left">{AuthOptions[val].label}</p>
                  <p className="w-full text-left text-xs text-tblack-200">
                    {AuthOptions[val].description}
                  </p>
                </button>
              </Card>
            ) : (
              <RadioGroup
                className="absolute left-full ml-4 w-fit"
                labelClassName="text-white"
                options={[
                  {
                    id: 'none',
                    label: (
                      <>
                        <p>No authentication</p>
                        <p className="text-xs text-tblack-200">
                          Set product as free to access
                        </p>
                      </>
                    ),
                    value: 'none'
                  }
                ]}
                onChange={() => setValue('auth_type', 'none')}
                checked={auth_type}
              />
            )
          )}
        </div>
      </div>
      <Input
        name="redirectUrl"
        placeholder="Redirect URL"
        label="Redirect URL"
        labelClassName="text-white"
        {...register('redirect_url')}
      />
      <Input
        name="returnUrl"
        placeholder="Return URL"
        label="Return URL"
        labelClassName="text-white"
        {...register('return_url')}
      />
      <p className="text-xs text-[#94A7AF] text-justify">
        Note: These urls are set for the checkout session. Once users finish
        their checkout session, the redirect url is for a successful payment
        processing and return url is for when the user cancels the transaction.
      </p>
      <div className="flex space-x-2">
        <Button variant={ButtonVariant.outlined} onClick={onClick}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </div>
  );
};

export default StepThreeAuth;
