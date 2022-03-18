import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Title from 'components/_typography/Title';
import Paragraph from 'components/_typography/Paragraph';
import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
import { LogoVariant } from 'types/ArcheTypeLogo';
import { TypographyVariant } from 'types/Typography';
import Input from 'components/_common/Input';
import { FormVariant } from 'types/Form';
import Divider from 'components/_common/Divider';
import ErrorText from 'components/_typography/ErrorText';
import AuthService from 'services/auth.service';
import { AuthFormData } from 'types/Auth';
import AuthLayout from 'components/_layout/AuthLayout';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';
import SuccessText from 'components/_typography/SuccessText';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email must be valid.')
      .required('Email is Required.')
  })
  .required();

const ResetPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormData>({ resolver: yupResolver(schema) });

  const [networkError, setNetworkError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (values: AuthFormData) => {
    try {
      await AuthService.sendResetPasswordEmail(values);
      setEmailSent(true);
    } catch (err) {
      setNetworkError(err);
    }
  };

  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && !currentUser.emailVerified) {
      router.push(ROUTES.AUTH.VERIFY);
    } else if (currentUser) {
      router.push(ROUTES.HOME);
    }
  }, [currentUser, router]);

  return (
    <AuthLayout title="Reset password">
      <div className="w-full h-full flex flex-col justify-center">
        <div className="flex flex-col space-y-4">
          <ArcheTypeLogo
            variant={LogoVariant.darkText}
            className="w-20 mx-auto mb-20"
            direction="vertical"
          />
          <Title variant={TypographyVariant.dark}>Password Reset</Title>
          <div className="flex space-x-2 justify-center items-center">
            <Paragraph
              variant={TypographyVariant.darkFaint}
              className="!w-auto"
              level={2}
            >
              Need an Account?
            </Paragraph>
            <Button
              variant={ButtonVariant.link}
              className="!p-0"
              url={ROUTES.AUTH.SIGNUP}
            >
              Sing up
            </Button>
          </div>
        </div>
        <form
          className="w-full flex flex-col space-y-[24px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {networkError ? (
            <ErrorText>
              {networkError?.message ||
                'Something went wrong! Please try again.'}
            </ErrorText>
          ) : null}
          {emailSent ? (
            <SuccessText>
              Password reset email sent successfully. Please check your email.
            </SuccessText>
          ) : (
            <>
              <Input
                name="email"
                label="Email"
                variant={FormVariant.outlined}
                placeholder="Enter Email Address"
                {...register('email')}
              />
              <ErrorText>{errors.email?.message}</ErrorText>
              <Button className="w-full" type="submit">
                Reset Password
              </Button>
            </>
          )}
          <div className="flex justify-center items-center">
            <Button
              variant={ButtonVariant.link}
              className="!p-0"
              url={ROUTES.AUTH.LOGIN}
            >
              Back to Sign In
            </Button>
            <Divider direction="vertical" className="mx-2 h-5" />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPage;
