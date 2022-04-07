import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updateProfile
} from 'firebase/auth';
import AccountVerifiedIcon from '../public/icons/account-verified.svg';
import AccountUnverifiedIcon from '../public/icons/account-unverified.svg';
import { useHelpers } from '../context/HelperProvider';
import { useAuth } from '../context/AuthProvider';
import Analytics from '../helpers/analytics';
import EditIcon from './_icons/EditIcon';
import Spinner from './_common/Spinner';
import Input from './_common/Input';
import Button from './_common/Button';
import SuccessText from './_typography/SuccessText';
import ErrorText from './_typography/ErrorText';
import Paragraph from './_typography/Paragraph';
import { TypographyVariant } from 'types/Typography';
import Divider from './_common/Divider';
import Title from './_typography/Title';

const Component = () => {
  const router = useRouter();

  const { currentUser } = useAuth();
  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const { message, status } = router.query;

    if (message) {
      showAlert(message, status === 'success');
      router.replace('/profile');
    }
  }, [router, showAlert]);

  const sendEmail = useCallback(async () => {
    try {
      Analytics.event({
        action: 'click',
        params: { name: 'Profile - Verify Email' }
      });

      if (inProgress) {
        return;
      }
      setProgress(true);

      await sendEmailVerification(currentUser);

      showAlert('Verification link sent, please check your mailbox', true);

      setLinkSent(true);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [currentUser, inProgress, showAlert]);

  const saveForm = useCallback(async () => {
    try {
      if (inProgress) return;
      setProgress(true);
      if (currentUser?.displayName !== name) {
        await updateProfile(currentUser, { displayName: name });
      }
      if (currentUser.email !== email) {
        await updateEmail(currentUser, password);
      }
      if (password) {
        await updatePassword(currentUser, password);
      }
      setIsEditing(false);
      setPassword('');
      showAlert('Saved Successfully', true);
    } catch (err) {
      showAlert(err.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, currentUser, name, email, password, showAlert]);

  return (
    <>
      {inProgress && <Spinner />}
      <div className="block">
        <Image
          className="icon"
          src={
            currentUser.emailVerified
              ? AccountVerifiedIcon
              : AccountUnverifiedIcon
          }
          alt="Key"
          width={18}
          height={18}
        />
        <div className="flex justify-start">
          <Paragraph variant={TypographyVariant.dark} level={3}>
            Status account:
          </Paragraph>
          {currentUser.emailVerified ? (
            <SuccessText>Verified</SuccessText>
          ) : (
            <ErrorText>Not verified</ErrorText>
          )}
        </div>
        {!linkSent && (
          <Button type="button" onClick={sendEmail}>
            Send an email to verify
          </Button>
        )}
      </div>
      <Divider />
      <div className="caption-block">
        <Title variant={TypographyVariant.dark}>Information</Title>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <EditIcon gradient={isEditing} fill="#ffffff" />
        </Button>
      </div>
      <form className="form">
        <Input
          name="userName"
          placeholder="Name"
          label="Name"
          value={name}
          disabled={!isEditing}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          name="userEmail"
          placeholder="Email"
          label="Email"
          htmlType="email"
          value={email}
          disabled={!isEditing}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          name="password"
          placeholder="Password"
          label="Password"
          htmlType="password"
          value={password}
          disabled={!isEditing}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div>
        <Button disabled={!isEditing} onClick={saveForm}>
          Save
        </Button>
      </div>
    </>
  );
};

export default Component;
