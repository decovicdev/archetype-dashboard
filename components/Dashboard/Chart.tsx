import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Card from 'components/_common/Card';
import Paragraph from 'components/_typography/Paragraph';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';

const chData = [
  {
    name: 'Jan',
    MTR: 4000,
    Adjustments: 2400
  },
  {
    name: 'Feb',
    MTR: 3000,
    Adjustments: 1398
  },
  {
    name: 'Mar',
    MTR: 2000,
    Adjustments: 9800
  },
  {
    name: 'Apr',
    MTR: 2780,
    Adjustments: 3908
  },
  {
    name: 'May',
    MTR: 1890,
    Adjustments: 4800
  },
  {
    name: 'Jun',
    MTR: 2390,
    Adjustments: 3800
  },
  {
    name: 'Jul',
    MTR: 3490,
    Adjustments: 4300
  },
  {
    name: 'Aug',
    MTR: 2780,
    Adjustments: 3908
  },
  {
    name: 'Sep',
    MTR: 1890,
    Adjustments: 4800
  },
  {
    name: 'Oct',
    MTR: 2390,
    Adjustments: 3800
  },

  {
    name: 'Nov',
    MTR: 2000,
    Adjustments: 9800
  },
  {
    name: 'Dec',
    MTR: 2780,
    Adjustments: 3908
  }
];

const Chart: React.FC = () => (
  <div className="grid grid-flow-col mt-4 gap-4">
    <Card className="w-fit">
      <Title
        className="!text-left ml-3"
        level={3}
        variant={TypographyVariant.dark}
      >
        Revenuye
      </Title>
      <div className="flex m-auto">
        <div className="flex justify-center align-middle flex-col mr-auto gap-3">
          <Paragraph
            className="!text-sm	 py-2 px-3"
            variant={TypographyVariant.dark}
          >
            Monthly MTR
          </Paragraph>
          <Paragraph
            className="text-left !text-sm	 py-2 px-3"
            variant={TypographyVariant.dark}
          >
            Adjustments
          </Paragraph>
          <Paragraph
            className="text-left !text-sm 	py-2 px-3"
            variant={TypographyVariant.dark}
          >
            Last Month
          </Paragraph>
        </div>

        <LineChart
          width={550}
          height={250}
          data={chData}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Adjustments"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="MTR" stroke="#82ca9d" />
        </LineChart>
      </div>
    </Card>
    <Card className="w-full ml-auto flex flex-col">
      <Title
        className="!text-left py-4 mb-2"
        level={3}
        variant={TypographyVariant.dark}
      >
        Subscriptions
      </Title>
      <div className="text-left mt-4 px-2 w-full">
        <Paragraph
          className="text-left py-2  !text-sm px-3"
          variant={TypographyVariant.dark}
        >
          Active Users
        </Paragraph>
        <Paragraph
          className="text-left py-2 !text-sm px-3"
          variant={TypographyVariant.dark}
        >
          Trials Users
        </Paragraph>
        <Paragraph
          className="text-left py-2  !text-sm px-3"
          variant={TypographyVariant.dark}
        >
          Expired Users
        </Paragraph>
      </div>
    </Card>
  </div>
);
export default Chart;
