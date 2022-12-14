import { useRouter } from 'next/router';
import Button from 'components/_common/Button';
// import Input from 'components/_common/Input';
// import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
import ArcheTypeNlogo from 'components/_icons/ArchTypeNlogo';
// import PlusCircle from 'components/_icons/PlusCircle';
import { ROUTES } from 'constant/routes';
// import { LogoVariant } from 'types/ArcheTypeLogo';
import { ButtonVariant } from 'types/Button';
import Paragraph from 'components/_typography/Paragraph';
import PrivateRoute from 'components/_common/PrivateRoute';
// import { useProducts } from 'hooks/useProducts';
// import { useEndpoints } from 'hooks/useEndpoints';
// import { useUsers } from 'hooks/useUsers';
import DashboardIcon from 'components/_icons/DashboardIcon';
import TagIcon from 'components/_icons/TagIcon';
import DatabaseIcon from 'components/_icons/DatabaseIcon';
import UsersIcon from 'components/_icons/UsersIcon';
import ChartIcon from 'components/_icons/ChartIcon';
import ChatIcon from 'components/_icons/ChatIcon';
import UserIcon from 'components/_icons/UserIcon';
import SettingsIcon from 'components/_icons/SettingsIcon';
import { Fragment, useEffect, useMemo, useState } from 'react';
import Switch from 'components/_common/Switch';
import $api from 'helpers/http';
import config from 'config';
import { useAuth } from 'context/AuthProvider';
import { useQueryClient } from 'react-query';
// import { useApi } from 'hooks/useApi';
// import AuthService from 'services/auth.service';
// import { useQuery } from 'react-query';

const ICONS = {
  [ROUTES.DASHBOARD.DASHBOARD]: DashboardIcon,
  [ROUTES.DASHBOARD.PRODUCTS]: TagIcon,
  [ROUTES.DASHBOARD.ENDPOINTS]: DatabaseIcon,
  [ROUTES.DASHBOARD.USERS]: UsersIcon,
  [ROUTES.DASHBOARD.CHARTS]: ChartIcon,
  [ROUTES.DASHBOARD.DOCUMENTATIONS]: ChatIcon,
  [ROUTES.SETTINGS.ACCOUNT_SETTINGS]: UserIcon,
  [ROUTES.SETTINGS.SETTINGS]: SettingsIcon,
  [ROUTES.DASHBOARD.DIMENSIONS]: DashboardIcon
};

const LINKS = [
  { title: '', links: Object.entries(ROUTES.DASHBOARD) },
  // {
  //   title: 'User Manual',
  //   links: Object.entries(ROUTES.USER_MANUAL)
  // },
  {
    title: 'Settings',
    links: [...Object.entries(ROUTES.SETTINGS), ['LOGOUT', ROUTES.AUTH.LOGOUT]]
  }
];

const properCapitalize = (name: string) =>
  `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

const formatUrlName = (name: string) =>
  name
    ?.split('_')
    .map((word) => properCapitalize(word))
    .join(' ');

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const env = useMemo(
    () =>
      typeof window !== 'undefined'
        ? localStorage.getItem(`${currentUser?.uid}-mode`) || 'production'
        : 'production',
    [currentUser?.uid]
  );
  const isTestEnv = env === 'test';

  useEffect(() => {
    $api.defaults.baseURL = isTestEnv
      ? config.apiUrls.test
      : config.apiUrls.production;
  }, [isTestEnv]);

  // const { data: api, isLoading } = useQuery('lostApi', AuthService.getDetails);
  // const { data: products } = useProducts({ enabled: !isLoading && !!api });
  // const { data: endpoints } = useEndpoints({ enabled: !isLoading && !!api });
  // const { data: users } = useUsers({ enabled: !isLoading && !!api });

  const handleSwitch = () => {
    localStorage.setItem(
      `${currentUser.uid}-mode`,
      isTestEnv ? 'production' : 'test'
    );
    sessionStorage.removeItem('appId');
    window.location.reload();
  };

  return (
    <PrivateRoute>
      <div className="grid grid-cols-aside w-screen h-screen overflow-hidden bg-twhite-700">
        <div className="flex flex-col py-8 pl-4 pr-8 bg-tpurple-700 space-y-2">
          <ArcheTypeNlogo />
          {LINKS.map((section) => (
            <Fragment key={section.title}>
              {section.title ? (
                <Paragraph
                  level={2}
                  className="w-full pb-2 pt-4 pl-4 !text-left text-twhite-600"
                >
                  {section.title}
                </Paragraph>
              ) : null}
              {section.links.map(([name, url]) => {
                const Icon = ICONS[url];
                return (
                  <Button
                    key={url}
                    url={url}
                    externalUrl={
                      url === ROUTES.DASHBOARD.DOCUMENTATIONS
                        ? 'https://docs.archetype.dev/docs'
                        : null
                    }
                    variant={ButtonVariant.navLink}
                    className={`w-full !justify-start ${
                      url === ROUTES.AUTH.LOGOUT ? '!mb-0 !mt-auto' : ''
                    }`}
                    active={router.pathname.includes(url)}
                    leftIcon={
                      Icon ? (
                        <Icon
                          className={`mr-4 ${
                            router.pathname.includes(url)
                              ? 'text-white'
                              : 'text-tblue-700 group-hover:text-white'
                          }`}
                        />
                      ) : null
                    }
                  >
                    <span>{formatUrlName(name)}</span>
                    {/* {url.includes(ROUTES.PRODUCTS.BASE_URL) &&
                    products?.length ? (
                      <span className="px-3 py-1 bg-white text-tblue-700 rounded-2xl ml-auto text-xs">
                        {products.length}
                      </span>
                    ) : null}
                    {url.includes(ROUTES.ENDPOINTS.BASE_URL) &&
                    endpoints?.length ? (
                      <span className="px-3 py-1 bg-white text-tblue-700 rounded-2xl ml-auto text-xs">
                        {endpoints.length}
                      </span>
                    ) : null}
                    {url.includes(ROUTES.USERS.BASE_URL) && users?.length ? (
                      <span className="px-3 py-1 bg-white text-tblue-700 rounded-2xl ml-auto text-xs">
                        {users.length}
                      </span>
                    ) : null} */}
                  </Button>
                );
              })}
            </Fragment>
          ))}
        </div>
        <div className="h-full overflow-hidden">
          {/* <div className="flex w-full justify-between bg-white py-2">
            <Input
              placeholder="Search..."
              name="search"
              className="w-full m-0"
            />
          </div> */}
          <div className="py-6 pl-6 pr-12 h-full overflow-y-auto relative">
            <div
              className={`w-full rounded-md text-white flex items-center justify-between mb-4 ${
                isTestEnv ? 'bg-red-400 py-2 px-4' : 'bg-transparent'
              }`}
            >
              {isTestEnv ? (
                <p>You are currently running in test mode.</p>
              ) : null}
              <Switch
                label={`Switch to ${isTestEnv ? 'production' : 'test'} mode`}
                className="ml-auto"
                checked={isTestEnv}
                onChange={handleSwitch}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;
