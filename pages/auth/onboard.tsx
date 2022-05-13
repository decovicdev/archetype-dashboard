import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
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
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type InputValues = {
  name: string;
  company: string;
  url: string;
  auth_type: string;
  redirect_url: string;
  return_url: string;
};

const validationSchema = object().shape({
  name: string().required(),
  company: string().required(),
  url: string().url().required(),
  auth_type: string().required(),
  redirect_url: string().url().required(),
  return_url: string().url().required()
});

const Component = () => {
  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();
  const { auth, api: apiService } = useApi();
  const { showAlert } = useHelpers();
  const { data: api, isLoading } = useQuery('lostApi', () => auth.getDetails());
  const queryClient = useQueryClient();

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
      void router.push(ROUTES.AUTH.SIGNUP);
    }
  }, [currentUser, isAuthLoading, router]);

  useEffect(() => {
    if (
      currentUser &&
      (currentUser.emailVerified ||
        currentUser?.providerId?.includes('github')) &&
      api
    ) {
      // void router.push(ROUTES.SETTINGS.SETTINGS);
    }
  }, [api, currentUser, isAuthLoading, router]);

  const { mutate: submitForm, isLoading: isMutationLoading } = useMutation(
    async (data: any) => {
      if (isMutationLoading) return;
      if (!data.name) {
        throw new Error('Name is required');
      }
      if (!data.company) {
        throw new Error('Company is required');
      }
      await apiService.createNew(data);
    },
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries('api');
        showAlert('API is successfully created', true);
        void router.push(ROUTES.SETTINGS.SETTINGS);
      }
    }
  );
  const hanlde = (data) => submitForm(data);

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
        setInitialValues({ ...initialValues, ...values });
        hanlde({ ...initialValues, ...values });
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
