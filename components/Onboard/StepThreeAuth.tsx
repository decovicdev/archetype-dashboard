import { useForm, useFormContext } from 'react-hook-form';
import { MouseEventHandler, useEffect } from 'react';
import Button from 'components/_common/Button';
import Card from 'components/_common/Card';
import Input from 'components/_common/Input';
import Title from 'components/_typography/Title';
import { AUTH_TYPES } from 'types/Auth';
import RadioGroup from 'components/_common/RadioGroup';
import { ButtonVariant } from 'types/Button';
import { Form, FormikProvider, useFormik } from 'formik';
import { object, string } from 'yup';
import ErrorText from 'components/_typography/ErrorText';

const AuthOptions = [
  {
    label: 'Header',
    description: 'Secure & traditional way to add API key',
    type: AUTH_TYPES.header
  },
  {
    label: 'Body (Request)',
    description: 'Secure way to add API key',
    type: AUTH_TYPES.body
  },
  {
    label: 'URL',
    description: 'Accessible via GET request',
    type: AUTH_TYPES.url
  }
];

type Props = {
  handleSubmit: (values) => void;
  values: { auth_type: string; redirect_url: string; return_url: string };
  handlePrev: () => void;
};

const StepThreeAuth: React.FC<Props> = ({
  handleSubmit,
  handlePrev,
  values: init
}) => {
  const formik = useFormik({
    initialValues: init,
    validationSchema: object().shape({
      auth_type: string().required('Choose authentication'),
      redirect_url: string().url().required('Redirect url is required'),
      return_url: string().url().required('Return url is required')
    }),
    onSubmit: (values, helpers) => {
      handleSubmit(values);
    }
  });

  const { getFieldProps, values, setFieldValue, errors, touched } = formik;

  return (
    <div className="w-full h-full flex flex-col space-y-10 justify-center items-center">
      <Title className="!text-left" level={3}>
        2. Set up end-user authentication
      </Title>
      <div className="w-full flex flex-col">
        <FormikProvider value={formik}>
          <Form>
            <label className="text-left w-full mb-2">
              Authentication Type (For End User)
            </label>
            <div className="pb-4">
              <div className="grid grid-cols-3 gap-x-2 relative">
                <>
                  {AuthOptions.map((auth) => (
                    <Card
                      className={
                        values.auth_type === auth.type
                          ? 'opacity-100'
                          : 'opacity-70'
                      }
                      key={auth.label}
                    >
                      <button
                        type="button"
                        className="w-full flex flex-col justify-start items-start"
                        onClick={() => setFieldValue('auth_type', auth.type)}
                      >
                        <p className="w-full text-left">{auth.label}</p>
                        <p className="w-full text-left text-xs text-tblack-200">
                          {auth.description}
                        </p>
                      </button>
                    </Card>
                  ))}
                  <RadioGroup
                    className="absolute left-full ml-4 w-fit"
                    labelClassName="text-white"
                    options={[
                      {
                        id: 'auth_type',
                        label: (
                          <>
                            <p>No authentication</p>
                            <p className="text-xs text-tblack-200">
                              Set product as free to access
                            </p>
                          </>
                        ),
                        value: values.auth_type
                      }
                    ]}
                    onChange={() => setFieldValue('auth_type', AUTH_TYPES.none)}
                    checked={AUTH_TYPES.none}
                  />
                </>
              </div>
              {Boolean(touched.auth_type && errors.auth_type) && (
                <ErrorText>{errors.auth_type}</ErrorText>
              )}
            </div>

            <div className="pb-4">
              <Input
                name="redirectUrl"
                placeholder="Redirect URL"
                label="Redirect URL"
                labelClassName="text-white"
                {...getFieldProps('redirect_url')}
              />
              {Boolean(touched.redirect_url && errors.redirect_url) && (
                <ErrorText>{errors.redirect_url}</ErrorText>
              )}
            </div>
            <div className="pb-4">
              <Input
                name="returnUrl"
                placeholder="Return URL"
                label="Return URL"
                labelClassName="text-white pb-4"
                {...getFieldProps('return_url')}
              />
              {Boolean(touched.return_url && errors.return_url) && (
                <ErrorText>{errors.return_url}</ErrorText>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={ButtonVariant.outlined}
                onClick={handlePrev}
              >
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </Form>
        </FormikProvider>
      </div>

      <p className="text-xs text-[#94A7AF] text-justify">
        Note: These urls are set for the checkout session. Once users finish
        their checkout session, the redirect url is for a successful payment
        processing and return url is for when the user cancels the transaction.
      </p>
    </div>
  );
};

export default StepThreeAuth;
