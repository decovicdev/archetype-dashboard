import Head from 'next/head';
import MainLayout from 'components/_layout/MainLayout';
import Paragraph from 'components/_typography/Paragraph';
import Card from 'components/_common/Card';
import List from 'components/_typography/List';
import Spinner from 'components/_common/Spinner';
import { useAuth } from 'context/AuthProvider';
import config from 'config';

type Props = {
  title?: string;
};

const AuthLayout: React.FC<Props> = ({ children, title }) => {
  const { isAuthLoading } = useAuth();

  return (
    <>
      {title ? (
        <Head>
          <title>
            {title} - {config.meta.title}
          </title>
        </Head>
      ) : null}
      <MainLayout>
        <div className="w-full h-full grid grid-cols-2 gap-x-20 items-center px-60 py-32">
          <div className="w-full h-full flex flex-col justify-center items-start space-y-6">
            <Paragraph className="!text-left">Archetype handles</Paragraph>
            <List className="space-y-6">
              <li>infrastructure for creating plans</li>
              <li>managing quotas</li>
              <li>editing permissions</li>
              <li>dynamic pricing for APIs</li>
            </List>
            <Paragraph className="!text-left">
              with just a few lines of code!
            </Paragraph>
          </div>
          <Card className="flex flex-col h-full w-full space-y-10 p-[60px] max-w-[540px]">
            {isAuthLoading ? <Spinner /> : children}
          </Card>
        </div>
      </MainLayout>
    </>
  );
};

export default AuthLayout;
