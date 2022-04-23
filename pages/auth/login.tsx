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
import ArcheTypeNlogo from 'components/_icons/ArchTypeNlogo';
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
import GoogleIcon from 'components/_icons/GoogleIcon';
import GithubIcon from 'components/_icons/GithubIcon';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email must be valid.')
      .required('Email is Required.'),
    password: yup.string().required()
  })
  .required();

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormData>({ resolver: yupResolver(schema) });

  const [networkError, setNetworkError] = useState<Error>(null);

  const onSubmit = async (values: AuthFormData) => {
    try {
      await AuthService.login(values);
    } catch (err) {
      setNetworkError(err as Error);
    }
  };

  const router = useRouter();
  const { isAuthLoading, currentUser, isGithubAuth } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;
    if (currentUser && !currentUser.emailVerified && !isGithubAuth) {
      void router.push(ROUTES.AUTH.VERIFY);
    } else if (currentUser) {
      void router.push(ROUTES.SETTINGS.SETTINGS);
    }
  }, [currentUser, isAuthLoading, isGithubAuth, router]);

  return (
    <AuthLayout title="Login">
      <div className="flex flex-col space-y-4">
        <ArcheTypeNlogo className="w-20 mx-auto" variant="dark" />
        <Title variant={TypographyVariant.dark}>Sign In</Title>
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
            Create an Account
          </Button>
        </div>
      </div>
      <form
        className="w-full flex flex-col space-y-[24px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {networkError ? (
          <ErrorText>
            {networkError?.message || 'Something went wrong! Please try again.'}
          </ErrorText>
        ) : null}
        <Input
          name="email"
          label="Email"
          variant={FormVariant.outlined}
          placeholder="Enter Email Address"
          {...register('email')}
        />
        <ErrorText>{errors.email?.message}</ErrorText>
        <Input
          name="password"
          label="Password"
          htmlType="password"
          variant={FormVariant.outlined}
          placeholder="Enter Password"
          {...register('password')}
        />
        <ErrorText>{errors.password?.message}</ErrorText>
        <Button className="w-full" type="submit">
          Sign In
        </Button>
        <div className="flex justify-center items-center">
          <Button
            variant={ButtonVariant.link}
            className="!p-0"
            url={ROUTES.AUTH.RESET}
          >
            Forgot your password?
          </Button>
          <Divider direction="vertical" className="mx-2 h-5" />
        </div>
        <Divider className="my-2" />
        <Paragraph variant={TypographyVariant.darkFaint} level={2}>
          Or sign in using:
        </Paragraph>
        <Button
          variant={ButtonVariant.outlined}
          onClick={AuthService.loginWithGoogle}
        >
          <GoogleIcon className="mr-2" />
          Continue with Google
        </Button>
        <Button
          variant={ButtonVariant.outlined}
          onClick={AuthService.loginWithGithub}
        >
          <GithubIcon className="mr-2" />
          Continue with GitHub
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
