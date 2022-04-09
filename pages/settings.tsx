import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMutation, useQuery } from 'react-query';
import config from '../config';
import KeyIcon from '../public/icons/key.svg';
import AuthIcon from '../public/icons/auth.svg';
import { useHelpers } from '../context/HelperProvider';
import ApiService from '../services/api.service';
import DeleteIcon from 'components/_icons/DeleteIcon';
import Spinner from 'components/_common/Spinner';
import Modal from 'components/_common/Modal';
import Input from 'components/_common/Input';
import RadioGroup from 'components/_common/RadioGroup';
import Button from 'components/_common/Button';
import Paragraph from 'components/_typography/Paragraph';
import useDisclosure from 'hooks/useDisclosure';
import { ButtonVariant } from 'types/Button';
import { TypographyVariant } from 'types/Typography';
import DashboardLayout from 'components/_layout/DashboardLayout';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import { ROUTES } from 'constant/routes';
import { AUTH_TYPES } from 'types/Auth';
import { RadioOption } from 'types/Form';

const radioOptions: RadioOption[] = [
  { id: 'none', label: 'No auth', value: AUTH_TYPES.none },
  { id: 'url', label: 'URL', value: AUTH_TYPES.url },
  { id: 'header', label: 'Header', value: AUTH_TYPES.header },
  { id: 'body', label: 'Body', value: AUTH_TYPES.body }
];

const SettingsPage = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();
  const [isDeleting, setDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useQuery('api', ApiService.getCurrent, {
    onError: (e: any) => {
      showAlert(e.message as string);
    }
  });

  const [authType, setAuthType] = useState(data?.auth_type);
  const [redirectUrl, setRedirectUrl] = useState(
    data?.url || data?.redirect_url
  );
  const [returnUrl, setReturnUrl] = useState(data?.return_url);

  useEffect(() => {
    setAuthType(data?.auth_type);
    setRedirectUrl(data?.url || data?.redirect_url);
    setReturnUrl(data?.return_url);
  }, [data?.auth_type, data?.redirect_url, data?.return_url, data?.url]);

  useEffect(() => {
    const { message, status } = router.query;
    if (message) {
      showAlert(message as string, status === 'success');
      void router.replace('/settings');
    }
  }, [router, showAlert]);

  const { mutate: saveForm } = useMutation(
    async () => {
      await ApiService.update({
        auth_type: authType,
        url: redirectUrl,
        return_url: returnUrl
      });
    },
    {
      onSuccess: () => showAlert('Saved Successfully', true),
      onError: (e: any) => showAlert(e.message)
    }
  );

  const connectStripe = useCallback(async () => {
    try {
      if (data?.has_completed_checkout) {
        return showAlert('Stripe already linked');
      }
      const response = await ApiService.stripeCheckout();
      if (!response.connect_url) {
        throw new Error('Oops, could not get enough data to proceed');
      }
      const redirectUrl = `${config.app_url}settings`;
      window.location.replace(
        `${response.connect_url}?return_url=${redirectUrl}&refresh_url=${redirectUrl}`
      );
    } catch (e) {
      showAlert(e.message);
    } finally {
      // setProgress(false);
    }
  }, [showAlert, data]);

  const clickDeleteAccount = useCallback(async () => {
    try {
      if (isDeleting) return;
      setDeleting(true);
      showAlert('Not implemented');
    } catch (e) {
      showAlert(e.message);
      setDeleting(false);
    }
  }, [isDeleting, showAlert]);

  const updateAuthType = useCallback((e) => {
    setAuthType(e.target.value);
  }, []);

  const isBlurred = !data?.has_completed_checkout;

  return (
    <DashboardLayout>
      <Head>
        <title>Settings - {config.meta.title}</title>
      </Head>
      <div className="flex flex-col space-y-2">
        <BreadCrumbs
          links={[
            { url: ROUTES.SETTINGS.SETTINGS, title: 'Settings' },
            { url: ROUTES.SETTINGS.ACCOUNT_SETTINGS, title: 'Profile' }
          ]}
        />

        {isLoading && <Spinner />}
        <div>
          <Image
            className="icon"
            src={KeyIcon}
            alt="Key"
            width={18}
            height={18}
          />{' '}
          <div>
            <Paragraph
              className="text-left"
              level={2}
              variant={TypographyVariant.dark}
            >
              App ID: <span className="blur-sm">{data?.app_id}</span>
            </Paragraph>
            <Paragraph
              className="text-left"
              level={2}
              variant={TypographyVariant.dark}
            >
              Public key: <span className="blur-sm">{data?.public_key}</span>
            </Paragraph>
            <Paragraph
              className="text-left"
              level={2}
              variant={TypographyVariant.dark}
            >
              Secret key:{' '}
              <span className="blur-sm">
                {data?.secret_keys // TODO: it's secret_key for prod api not secret_keys
                  ?.join(', ')}
              </span>
            </Paragraph>
          </div>
          {isBlurred && (
            <Paragraph
              className="text-left"
              level={2}
              variant={TypographyVariant.dark}
            >
              Important! Link your account to Stripe to access your keys
            </Paragraph>
          )}
        </div>
        <div className="text-black">
          <Image
            className="icon"
            src={AuthIcon}
            alt="User"
            width={18}
            height={18}
          />{' '}
          Change auth type
        </div>
        <RadioGroup
          options={radioOptions}
          onChange={updateAuthType}
          checked={authType}
        />
        <Input
          name="redirectUrl"
          placeholder="URL"
          label={
            <>
              <Image
                className="icon"
                src={AuthIcon}
                width={18}
                height={18}
                alt="redirect url"
              />{' '}
              Redirect URL
            </>
          }
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
        />
        <Input
          name="returnUrl"
          placeholder="URL"
          label={
            <>
              <Image
                className="icon"
                src={AuthIcon}
                width={18}
                height={18}
                alt="return url"
              />{' '}
              Return URL
            </>
          }
          value={returnUrl}
          onChange={(e) => setReturnUrl(e.target.value)}
        />
        <Button variant={ButtonVariant.danger} onClick={onOpen}>
          <DeleteIcon gradient />
          <span className="ml-4">Delete App</span>
        </Button>
        <Button variant={ButtonVariant.primary} onClick={() => saveForm()}>
          Save
        </Button>
        <Button variant={ButtonVariant.outlined} onClick={connectStripe}>
          {data?.has_completed_checkout
            ? 'Stripe Successfully Linked'
            : 'Connect your stripe account'}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isBusy={isDeleting}>
          <div className="data">
            <h1>Delete Account</h1>
            <p>
              Are you sure you want to delete your account and lose access to
              all of your data?
            </p>
          </div>
          <div className="btns">
            <button type="button" className="btn grey" onClick={onClose}>
              No, Cancel
            </button>
            <button
              type="button"
              className="btn gradient-pink"
              onClick={clickDeleteAccount}
            >
              Yes, Delete
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
