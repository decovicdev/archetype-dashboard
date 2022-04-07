import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classnames from 'classnames';
import config from '../config';
import KeyIcon from '../public/icons/key.svg';
import AuthIcon from '../public/icons/auth.svg';
import { useHelpers } from '../context/HelperProvider';
import ApiService from '../services/api.service';
import DeleteIcon from './_icons/DeleteIcon';
import Spinner from './_common/Spinner';
import Modal from './_common/Modal';
import Input from './_common/Input';
import RadioGroup from './_common/RadioGroup';
import Button from './_common/Button';
import useDisclosure from 'hooks/useDisclosure';
import { ButtonVariant } from 'types/Button';
import Paragraph from './_typography/Paragraph';
import { TypographyVariant } from 'types/Typography';

const AUTH_TYPES = {
  NONE: 'none',
  HEADER: 'header',
  URL: 'url',
  BODY: 'body'
};

const Component = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [data, setData] = useState(null);
  const [authType, setAuthType] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [returnUrl, setReturnUrl] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetch = useCallback(async () => {
    try {
      setProgress(true);

      const data = await ApiService.getCurrent();
      console.log({ data });

      setData(data);
      setAuthType(data.auth_type);
      setRedirectUrl(data.url);
      setReturnUrl(data.return_url);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { message, status } = router.query;

    if (message) {
      showAlert(message, status === 'success');

      router.replace('/settings');
    }
  }, [router, showAlert]);

  const saveForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      ApiService.update({
        auth_type: authType,
        url: redirectUrl,
        return_url: returnUrl
      });

      showAlert('Saved Successfully', true);
    } catch (err) {
      showAlert(err.message);
    } finally {
      setProgress(false);
    }
  }, [showAlert, inProgress, authType, redirectUrl, returnUrl]);

  const connectStripe = useCallback(async () => {
    try {
      if (data?.has_completed_checkout) {
        return showAlert('Stripe already linked');
      }
      if (inProgress) {
        return showAlert('Already in progress');
      }
      setProgress(true);

      const response = await ApiService.stripeCheckout();
      console.log({ response });

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
      setProgress(false);
    }
  }, [inProgress, showAlert, data]);

  const clickDeleteAccount = useCallback(async () => {
    try {
      if (isDeleting) {
        return;
      }
      setDeleting(true);

      showAlert('Not implemented');
    } catch (e) {
      showAlert(e.message);

      setDeleting(false);
    }
  }, [isDeleting, showAlert]);

  const updateAuthType = (e) => {
    setAuthType(e.target.value);
  };

  const renderSensitiveData = useCallback(() => {
    const isBlurred = !data?.has_completed_checkout;

    return (
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
            <span className="blur-sm">{data?.secret_key?.join(', ')}</span>
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
    );
  }, [data]);

  const radioOptions = [
    { id: 'noAuth', label: 'No auth', value: AUTH_TYPES.NONE },
    { id: 'url', label: 'URL', value: AUTH_TYPES.URL },
    { id: 'header', label: 'Header', value: AUTH_TYPES.HEADER },
    { id: 'body', label: 'Body', value: AUTH_TYPES.BODY }
  ];

  return (
    <>
      {inProgress && <Spinner />}
      {renderSensitiveData()}
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
      <Button variant={ButtonVariant.primary} onClick={saveForm}>
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
            Are you sure you want to delete your account and lose access to all
            of your data?
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
    </>
  );
};

export default Component;
