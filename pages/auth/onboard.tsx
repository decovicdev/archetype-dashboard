import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import config from 'config';

import { useAuth } from 'context/AuthProvider';
import { useHelpers } from 'context/HelperProvider';
import OnboardingLayout from 'components/_layout/OnboardingLayout';
import { ROUTES } from 'constant/routes';
import StepOneWelcome from 'components/Onboard/StepOneWelcome';
import StepTwoForm from 'components/Onboard/StepTwoForm';
import StepThreeAuth from 'components/Onboard/StepThreeAuth';
import Spinner from 'components/_common/Spinner';
import { useApi } from 'context/ApiProvider';

type InputValues = {
  name: string;
  company: string;
  url: string;
  auth_type: string;
  redirect_url: string;
  return_url: string;
};

const Component = () => {
  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();
  const { auth, api: apiService } = useApi();
  const { showAlert } = useHelpers();
  const {
    data: api,
    isLoading,
    refetch
  } = useQuery('api', () => auth.getDetails());

  const [step, setStep] = useState(0);
  const [initialValues, setInitialValues] = useState({
    name: '',
    company: '',
    url: '',
    auth_type: '',
    redirect_url: '',
    return_url: ''
  });

  useEffect(() => {
    if (!currentUser && !isAuthLoading) {
      router.push(ROUTES.AUTH.SIGNUP);
    }
  }, [currentUser, isAuthLoading, router]);

  useEffect(() => {
    if (
      currentUser &&
      (currentUser.emailVerified ||
        currentUser?.providerId?.includes('github')) &&
      api
    ) {
      router.push(ROUTES.SETTINGS.SETTINGS);
    }
  }, [api, currentUser, isAuthLoading, router]);

  const { mutate, isLoading: isApiLoading } = useMutation<
    unknown,
    unknown,
    typeof initialValues
  >((data) => apiService.createNew(data), {
    onError: (e: any) => showAlert(e.message),
    onSuccess: () => {
      showAlert('API is successfully created', true);
      router.push(ROUTES.SETTINGS.SETTINGS);
      refetch();
    }
  });

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleS = (values?: Partial<typeof initialValues>) => {
    switch (step) {
      case 1:
        setInitialValues({ ...initialValues, ...values });
        setStep(step + 1);
        break;

      case 2:
        mutate({ ...initialValues, ...values });
        setInitialValues({ ...initialValues, ...values });
        break;

      default:
        setStep(step + 1);
    }
  };

  if (isAuthLoading || isLoading) return <Spinner fullPage />;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepTwoForm handleSubmit={handleS} values={initialValues} />;

      case 2:
        return (
          <StepThreeAuth
            handleSubmit={handleS}
            values={initialValues}
            handlePrev={handlePrev}
            isLoading={isApiLoading}
          />
        );

      default:
        return <StepOneWelcome onClick={handleS} />;
    }
  };

  return (
    <OnboardingLayout>
      <Head>
        <title>Create API - {config.meta.title}</title>
      </Head>
      {renderStep()}

      {/* {step === 0 ? (
        <StepOneWelcome
          onClick={() => {
            setStep(1);
          }}
        />
      ) : null}
      {step > 0 ? (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full max-w-[450px]"
          >
            {step === 1 ? (
              <StepTwoForm disabled={isLoading} onClick={() => setStep(2)} />
            ) : null}
            {step === 2 ? <StepThreeAuth onClick={() => setStep(1)} /> : null}
          </form>
        </FormProvider>
      ) : null} */}
    </OnboardingLayout>
  );
};

export default Component;
