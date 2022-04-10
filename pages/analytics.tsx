import Head from 'next/head';

import { Table } from 'antd';
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  endpointLatencyData,
  mprByPlan,
  mrpOverviewData,
  requestsBreakdownData,
  columns,
  endpointOverview
} from '../helpers/data';
import config from 'config';
import DashboardLayout from 'components/_layout/DashboardLayout';

const COLORS = [
  '#1f6d92',
  '#645987',
  '#ac8805',
  '#5f88a4',
  '#b9b8ba',
  '#b0a368'
];

const Component = () => (
  <DashboardLayout>
    <Head>
      <title>Analytics - {config.meta.title}</title>
    </Head>
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '30px 0 50px 0',
        margin: '30px auto',
        width: '100%'
      }}
    >
      <h1
        style={{
          padding: '0 40px 20px',
          borderBottom: 'solid 1px #eee',
          marginBottom: '40px'
        }}
      >
        Requests Breakdown
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={requestsBreakdownData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="requests" fill="#baa365" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '30px 0 50px 0',
        margin: '30px auto',
        width: '100%'
      }}
    >
      <h1
        style={{
          padding: '0 40px 20px',
          borderBottom: 'solid 1px #eee',
          marginBottom: '40px'
        }}
      >
        Endpoints Latency
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis dataKey="requests" />
          <Tooltip />
          <Legend />
          {endpointLatencyData.map((s, index) => (
            <Line
              dataKey="requests"
              data={s.data}
              name={s.name}
              key={s.name}
              fill={COLORS[index]}
              stroke={COLORS[index]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '30px 0 50px 0',
        margin: '30px auto',
        width: '100%'
      }}
    >
      <h1
        style={{
          padding: '0 40px 20px',
          borderBottom: 'solid 1px #eee',
          marginBottom: '40px'
        }}
      >
        MRP Overview
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={400}
          data={mrpOverviewData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="churn"
            stackId="1"
            stroke="#fab7b4"
            fill="#fab7b4"
          />
          <Area
            type="monotone"
            dataKey="downgrades"
            stackId="1"
            stroke="#ffcbae"
            fill="#ffcbae"
          />
          <Area
            type="monotone"
            dataKey="existing"
            stackId="1"
            stroke="#16b5d6"
            fill="#16b5d6"
          />
          <Area
            type="monotone"
            dataKey="upgrades"
            stackId="1"
            stroke="#9de6d4"
            fill="#9de6d4"
          />
          <Area
            type="monotone"
            dataKey="new"
            stackId="1"
            stroke="#00c3b1"
            fill="#00c3b1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '30px 0 50px 0',
        margin: '30px auto',
        width: '100%'
      }}
    >
      <h1
        style={{
          padding: '0 40px 20px',
          borderBottom: 'solid 1px #eee',
          marginBottom: '40px'
        }}
      >
        MRP by Plan
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={mprByPlan}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {mprByPlan.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '30px 0 50px 0',
        margin: '30px auto',
        width: '100%'
      }}
    >
      <h1
        style={{
          padding: '0 40px 20px',
          borderBottom: 'solid 1px #eee',
          marginBottom: '40px'
        }}
      >
        Endpoint Overview
      </h1>
      <Table columns={columns} dataSource={endpointOverview} />
    </div>
  </DashboardLayout>
);

export default Component;
