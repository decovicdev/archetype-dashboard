import Head from 'next/head';
import config from '../config';
import OnboardingLayout from 'components/_layout/OnboardingLayout';
import Button from 'components/_common/Button';
import { ROUTES } from 'constant/routes';
import Title from 'components/_typography/Title';
import Paragraph from 'components/_typography/Paragraph';

const InternalErrorPage = () => (
  <>
    <Head>
      <title>Internal Error - {config.meta.title}</title>
    </Head>
    <OnboardingLayout>
      <Title className="!mt-20">Internal Error</Title>
      <Paragraph level={2}>
        Oops, something is happened on our end, we will fix it asap.
      </Paragraph>
      <Paragraph level={2}>Please try again later or let us know.</Paragraph>
      <Button url={ROUTES.HOME}>Go back to the main page</Button>
    </OnboardingLayout>
  </>
);

export default InternalErrorPage;
