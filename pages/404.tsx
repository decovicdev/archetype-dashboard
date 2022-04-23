import Head from 'next/head';
import config from '../config';
import OnboardingLayout from 'components/_layout/OnboardingLayout';
import Button from 'components/_common/Button';
import { ROUTES } from 'constant/routes';
import Title from 'components/_typography/Title';
import Paragraph from 'components/_typography/Paragraph';

const NotFoundPage = () => (
  <>
    <Head>
      <title>Page Not Found - {config.meta.title}</title>
    </Head>
    <OnboardingLayout>
      <Title className="!mt-20">Page not found</Title>
      <Paragraph className="!leading-10" level={2}>
        Looks like the page you&apos;re looking for cannot be found, didn&apos;t
        load correctly or doesn&apos;t exist.
      </Paragraph>
      <Button url={ROUTES.HOME}>Go back to the main page</Button>
    </OnboardingLayout>
  </>
);

export default NotFoundPage;
