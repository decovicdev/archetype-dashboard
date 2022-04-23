import { QueryFunction, useQuery } from 'react-query';
import Card from 'components/_common/Card';
import DashboardLayout from 'components/_layout/DashboardLayout';
import TierService from 'services/tier.service';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import { ROUTES } from 'constant/routes';
import Spinner from 'components/_common/Spinner';
import PlusCircle from 'components/_icons/PlusCircle';
import Paragraph from 'components/_typography/Paragraph';
import EndpointService from 'services/endpoint.service';
import CustomerService from 'services/customer.service';
import Chart from 'components/Dashboard/Chart';

type Props = {
  queryName: string;
  queryFn: QueryFunction;
  title: string;
  mainPageUrl: string;
  addPageUrl: string;
};
const OverviewSection: React.FC<Props> = ({
  queryName,
  queryFn,
  title,
  mainPageUrl,
  addPageUrl
}) => {
  const { data, isLoading, isError } = useQuery(queryName, queryFn);

  return (
    <div className="flex flex-col mr-4 items-start border-r border-solid border-tblack-100">
      <Button variant={ButtonVariant.link} url={mainPageUrl}>
        {title}
      </Button>
      {isError ? (
        <div>Error..</div>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <Paragraph
          className="text-left py-2 px-3"
          variant={TypographyVariant.dark}
        >
          {data?.length ?? 0}
        </Paragraph>
      )}
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

const DashboardPage = () => (
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
          queryName="products"
          queryFn={TierService.getList}
          title="Products"
          mainPageUrl={ROUTES.PRODUCTS.BASE_URL}
          addPageUrl={ROUTES.PRODUCTS.ADD}
        />
        <OverviewSection
          queryName="endpoints"
          queryFn={EndpointService.getList}
          title="Endpoints"
          mainPageUrl={ROUTES.ENDPOINTS.BASE_URL}
          addPageUrl={ROUTES.ENDPOINTS.ADD}
        />
        <OverviewSection
          queryName="users"
          queryFn={CustomerService.getList}
          title="Users"
          mainPageUrl={ROUTES.USERS.BASE_URL}
          addPageUrl={ROUTES.USERS.ADD}
        />
      </div>
    </Card>
    <Chart></Chart>
  </DashboardLayout>
);

export default DashboardPage;
