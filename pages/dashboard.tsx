import { QueryFunction, useQuery } from 'react-query';
import Card from 'components/_common/Card';
import DashboardLayout from 'components/_layout/DashboardLayout';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import { ROUTES } from 'constant/routes';
import Spinner from 'components/_common/Spinner';
import PlusCircle from 'components/_icons/PlusCircle';
import Paragraph from 'components/_typography/Paragraph';
import Chart from 'components/Dashboard/Chart';
import Transactions from 'components/Dashboard/Transactions';
import { useApi } from 'context/ApiProvider';

type Props = {
  length: number;
  title: string;
  mainPageUrl: string;
  addPageUrl: string;
};
const OverviewSection: React.FC<Props> = ({
  title,
  mainPageUrl,
  addPageUrl,
  length = 0
}) => {
  return (
    <div className="flex flex-col mr-4 items-start border-r border-solid border-tblack-100">
      <Button variant={ButtonVariant.link} url={mainPageUrl}>
        {title}
      </Button>

      <Paragraph
        className="text-left py-2 px-3"
        variant={TypographyVariant.dark}
      >
        {length}
      </Paragraph>

      <Button
        leftIcon={<PlusCircle className="mr text-tblue-700" />}
        variant={ButtonVariant.link}
        url={addPageUrl}
      >
        Add
      </Button>
    </div>
  );
};

const DashboardPage = () => {
  const api = useApi();

  const { data: tiers = [] } = useQuery('tiers', () => api.tier.getList());
  const { data: endpoints = [] } = useQuery('endpoints', () =>
    api.endpoint.getList()
  );
  const { data: users = [] } = useQuery('user', () => api.user.getList());

  return (
    <DashboardLayout>
      <Title
        className="!text-left py-4 mb-2"
        level={3}
        variant={TypographyVariant.dark}
      >
        Archetype Connect
      </Title>
      <Card>
        <div className="grid grid-cols-4">
          <OverviewSection
            length={tiers.length}
            title="Products"
            mainPageUrl={ROUTES.PRODUCTS.BASE_URL}
            addPageUrl={ROUTES.PRODUCTS.ADD}
          />
          <OverviewSection
            length={endpoints.length}
            title="Endpoints"
            mainPageUrl={ROUTES.ENDPOINTS.BASE_URL}
            addPageUrl={ROUTES.ENDPOINTS.ADD}
          />
          <OverviewSection
            length={users.length}
            title="Users"
            mainPageUrl={ROUTES.USERS.BASE_URL}
            addPageUrl={ROUTES.USERS.ADD}
          />
        </div>
      </Card>
      <Chart />
      <Transactions />
    </DashboardLayout>
  );
};

export default DashboardPage;
