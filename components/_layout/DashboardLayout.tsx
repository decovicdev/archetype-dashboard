import { useRouter } from 'next/router';
import Button from 'components/_common/Button';
import Input from 'components/_common/Input';
import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
import PlusCircle from 'components/_icons/PlusCircle';
import { ROUTES } from 'constant/routes';
import { LogoVariant } from 'types/ArcheTypeLogo';
import { ButtonVariant } from 'types/Button';
import Paragraph from 'components/_typography/Paragraph';
import PrivateRoute from 'components/_common/PrivateRoute';

const LINKS = [
  { title: '', links: Object.entries(ROUTES.DASHBOARD) },
  {
    title: 'User Manual',
    links: Object.entries(ROUTES.USER_MANUAL)
  },
  {
    title: 'Settings',
    links: Object.entries(ROUTES.SETTINGS)
  }
];

const properCapitalize = (name) =>
  `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
const formatUrlName = (name) =>
  name
    ?.split('_')
    .map((word) => properCapitalize(word))
    .join(' ');

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  return (
    <PrivateRoute>
      <div className="grid grid-cols-aside w-screen h-screen overflow-hidden bg-twhite-700">
        <div className="border py-8 pl-4 pr-8 bg-tpurple-700 space-y-2">
          <ArcheTypeLogo
            variant={LogoVariant.lightText}
            className="p-2 mb-8 mr-4"
          />
          {LINKS.map((section) => (
            <>
              {section.title ? (
                <Paragraph
                  level={2}
                  className="w-full pb-2 pt-4 pl-4 !text-left text-twhite-600"
                >
                  {section.title}
                </Paragraph>
              ) : null}
              {section.links.map(([name, url]) => (
                <Button
                  key={url}
                  url={url}
                  variant={ButtonVariant.navLink}
                  className="w-full !justify-start"
                  active={router.pathname === url}
                  leftIcon={
                    <PlusCircle
                      className={`mr-4 ${
                        router.pathname === url
                          ? 'text-white'
                          : 'text-tblue-700 group-hover:text-white'
                      }`}
                    />
                  }
                >
                  {formatUrlName(name)}
                </Button>
              ))}
            </>
          ))}
        </div>
        <div className="grid grid-rows-header">
          <div className="flex w-full justify-between bg-white py-2">
            <Input
              placeholder="Search..."
              name="search"
              className="w-full m-0"
            />
          </div>
          <div className="py-6 pl-6 pr-12">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;
