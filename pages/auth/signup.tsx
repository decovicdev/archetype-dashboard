import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
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
import AuthService, { auth } from 'services/auth.service';
import { AuthFormData } from 'types/Auth';
import AuthLayout from 'components/_layout/AuthLayout';
import { ROUTES } from 'constant/routes';
import { useAuth } from 'context/AuthProvider';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email must be valid.')
      .required('Email is Required.')
      .test('unique', 'This email already exists.', async (value) => {
        const list = await fetchSignInMethodsForEmail(auth, value);
        return !list?.length;
      }),
    password: yup
      .string()
      .required()
      .min(6, 'Password should be at least 6 characters.')
      .matches(/(?=.*[0-9])/, 'Password must contain at least one number.')
      .matches(/(?=.*[a-zA-Z])/, 'Password must contain at least one letter.')
  })
  .required();

const SignupPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormData>({ resolver: yupResolver(schema) });

  const [networkError, setNetworkError] = useState(null);

  const onSubmit = async (values: AuthFormData) => {
    try {
      await AuthService.signup(values);
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
      router.push(ROUTES.SETTINGS);
    }
  }, [currentUser, router]);

  return (
    <AuthLayout title="Sign up">
      <ArcheTypeLogo variant={LogoVariant.darkText} className="w-40 mx-auto" />
      <div className="flex flex-col space-y-4">
        <Title variant={TypographyVariant.dark}>Create an Account</Title>
        <div className="flex space-x-2 justify-center items-center">
          <Paragraph
            variant={TypographyVariant.darkFaint}
            className="!w-auto"
            level={2}
          >
            Have an Account?
          </Paragraph>
          <Button
            variant={ButtonVariant.link}
            className="!p-0"
            url={ROUTES.AUTH.LOGIN}
          >
            Sign In
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
          variant={FormVariant.outlined}
          placeholder="Create Password"
          {...register('password')}
        />
        <ErrorText>{errors.password?.message}</ErrorText>
        <Button className="w-full" type="submit">
          Register
        </Button>
        <div className="flex justify-center items-center">
          <Button variant={ButtonVariant.link} className="!p-0">
            Terms of Service
          </Button>
          <Divider direction="vertical" className="mx-2 h-5" />
          <Button variant={ButtonVariant.link} className="!p-0">
            Privacy Policy
          </Button>
        </div>
        <Divider className="my-2" />
        <Paragraph variant={TypographyVariant.darkFaint} level={2}>
          Or create an account using:
        </Paragraph>
        <Button variant={ButtonVariant.outlined}>Continue with Google</Button>
        <Button variant={ButtonVariant.outlined}>Continue with GitHub</Button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
