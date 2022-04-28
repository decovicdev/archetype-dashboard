import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import RevenueTable from './RevenueTable';
import SubTable from './SubTable';
import Card from 'components/_common/Card';

const chartData = [
  {
    name: 'Jan',
    MTR: 2000,
    Adjustments: 2400
  },
  {
    name: 'Feb',
    MTR: 2000,
    Adjustments: 1398
  },
  {
    name: 'Mar',
    MTR: 2000,
    Adjustments: 1800
  },
  {
    name: 'Apr',
    MTR: 2460,
    Adjustments: 1308
  },
  {
    name: 'May',
    MTR: 1890,
    Adjustments: 1800
  },
  {
    name: 'Jun',
    MTR: 2390,
    Adjustments: 1800
  },
  {
    name: 'Jul',
    MTR: 2500,
    Adjustments: 1300
  },
  {
    name: 'Aug',
    MTR: 2180,
    Adjustments: 1908
  },
  {
    name: 'Sep',
    MTR: 1890,
    Adjustments: 2400
  },
  {
    name: 'Oct',
    MTR: 2220,
    Adjustments: 1900
  },

  {
    name: 'Nov',
    MTR: 2380,
    Adjustments: 1908
  },
  {
    name: 'Dec',
    MTR: 2380,
    Adjustments: 1908
  }
];

const Chart: React.FC = () => (
  <div className="grid grid-cols-12 gap-1 mt-4">
    <Card className="col-span-9 h-full">
      <div className="flex m-auto">
        <RevenueTable />
        <ResponsiveContainer width="70%" height={200}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="4 9" />
            <XAxis dataKey="name" />
            <YAxis dataKey="Adjustments" />
            <Tooltip />
            <Bar dataKey="MTR" fill="#1FD286" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
    <Card className="col-span-3 h-full">
      <SubTable />
    </Card>
  </div>
);
export default Chart;
