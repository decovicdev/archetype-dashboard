import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Title from 'components/_typography/Title';
import Paragraph from 'components/_typography/Paragraph';
import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
import { LogoVariant } from 'types/ArcheTypeLogo';
import { TypographyVariant } from 'types/Typography';
import Divider from 'components/_common/Divider';
import AuthLayout from 'components/_layout/AuthLayout';
import { useAuth } from 'context/AuthProvider';
import AuthService from 'services/auth.service';
import { ROUTES } from 'constant/routes';
import ErrorText from 'components/_typography/ErrorText';
import SuccessText from 'components/_typography/SuccessText';

const VerifyPage: NextPage = () => {
  const [networkError, setNetworkError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;
    if (currentUser?.emailVerified || currentUser.providerId) {
      void router.push(ROUTES.SETTINGS.SETTINGS);
    }
  }, [currentUser, isAuthLoading, router]);

  const email = currentUser?.email?.length
    ? `${currentUser.email[0]}**********${currentUser.email.slice(-4)}`
    : '';

  return (
    <AuthLayout title="Verify Email">
      <div className="h-full flex flex-col justify-center">
        <ArcheTypeLogo
          variant={LogoVariant.darkText}
          className="w-24 mx-auto"
          direction="vertical"
        />
        <div className="flex flex-col space-y-4 mt-24">
          <Title variant={TypographyVariant.dark}>Confirm your email</Title>
          <Paragraph variant={TypographyVariant.darkFaint} level={2}>
            Welcome back {email}
          </Paragraph>
          <Paragraph variant={TypographyVariant.darkFaint} level={2}>
            Verify through the link sent to your email
          </Paragraph>
          <Divider className="!mt-10 !mb-2" />
          {networkError ? (
            <ErrorText>
              {networkError?.message ||
                'Something went wrong! Please try again.'}
            </ErrorText>
          ) : null}
          <div className="flex space-x-2 justify-center items-center">
            {emailSent ? (
              <SuccessText>
                Verification email sent successfully. Please check your email.
              </SuccessText>
            ) : (
              <>
                <Paragraph
                  variant={TypographyVariant.darkFaint}
                  className="!w-auto"
                  level={3}
                >
                  Didn&apos;t receive any mail?
                </Paragraph>
                <Button
                  variant={ButtonVariant.link}
                  className="!p-0 text-sm"
                  onClick={async () => {
                    try {
                      await AuthService.sendVerificationEmail({
                        user: currentUser
                      });
                      setEmailSent(true);
                    } catch (err) {
                      setNetworkError(err);
                    }
                  }}
                >
                  Resend Confirmation
                </Button>
              </>
            )}
          </div>
          <div className="flex space-x-2 justify-center items-center">
            <Paragraph
              variant={TypographyVariant.darkFaint}
              className="!w-auto"
              level={3}
            >
              This is not you?
            </Paragraph>
            <Button
              variant={ButtonVariant.link}
              className="!p-0 text-sm"
              onClick={async () => {
                await AuthService.logout();
                router.push(ROUTES.AUTH.SIGNUP);
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyPage;
