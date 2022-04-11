import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import config from 'config';
import Spinner from 'components/_common/Spinner';
import ApiService from 'services/api.service';
import { useAuth } from 'context/AuthProvider';
import { useHelpers } from 'context/HelperProvider';
import OnboardingLayout from 'components/_layout/OnboardingLayout';
import { ROUTES } from 'constant/routes';
import { useApi } from 'hooks/useApi';
import StepOneWelcome from 'components/Onboard/StepOneWelcome';
import StepTwoForm from 'components/Onboard/StepTwoForm';
import StepThreeAuth from 'components/Onboard/StepThreeAuth';

const Component = () => {
  const router = useRouter();
  const { currentUser, isAuthLoading } = useAuth();

  const { showAlert } = useHelpers();

  useEffect(() => {
    if (!currentUser && !isAuthLoading) {
      void router.push(ROUTES.AUTH.SIGNUP);
    }
  }, [currentUser, isAuthLoading, router]);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.emailVerified &&
      sessionStorage.getItem('appId')
    ) {
      void router.push(ROUTES.SETTINGS.SETTINGS);
    }
  }, [currentUser, isAuthLoading, router]);

  const [step, setStep] = useState(0);
  const { data: api, isLoading } = useApi();

  // // TODO: use api data as initial values for this page
  // console.log({ api });

  const methods = useForm({ defaultValues: api });
  const queryClient = useQueryClient();

  const { mutate: submitForm, isLoading: isMutationLoading } = useMutation(
    async (data) => {
      if (isMutationLoading) return;
      if (!data.name) {
        throw new Error('Name is required');
      }
      if (!data.company) {
        throw new Error('Company is required');
      }
      await ApiService.createNew(data);
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

  const onSubmit = (data) => submitForm(data);

  return (
    <OnboardingLayout>
      <Head>
        <title>Create API - {config.meta.title}</title>
      </Head>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {step === 0 ? (
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
                {step === 1 ? <StepTwoForm onClick={() => setStep(2)} /> : null}
                {step === 2 ? (
                  <StepThreeAuth onClick={() => setStep(1)} />
                ) : null}
              </form>
            </FormProvider>
          ) : null}
        </>
      )}
    </OnboardingLayout>
  );
};

export default Component;
