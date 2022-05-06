import Head from 'next/head';

import { Table } from 'antd';
// import { useQuery } from 'react-query';
import {
  Bar as BarChartJs,
  Line as LineChartJs,
  Doughnut
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip as TooltipChartJs,
  Legend as LegendChartJs
} from 'chart.js';
import {
  endpointLatencyData,
  mprByPlan,
  requestsBreakdownData,
  columns,
  endpointOverview
} from '../helpers/data';
import config from 'config';
import DashboardLayout from 'components/_layout/DashboardLayout';
// import AnalyticsService from 'services/analytics.service';

const COLORS = [
  '#1f6d92',
  '#645987',
  '#ac8805',
  '#5f88a4',
  '#b9b8ba',
  '#b0a368'
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  ArcElement,
  TooltipChartJs,
  LegendChartJs
);

const chart1Options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Requests Breakdown'
    },
    legend: {
      position: 'bottom' as const
    }
  }
};

const chart1Data = {
  labels: requestsBreakdownData.map((i) => i.time),
  datasets: [
    {
      label: 'Requests',
      data: requestsBreakdownData.map((i) => i.requests),
      backgroundColor: '#baa365'
    }
  ]
};

const chart2Options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Endpoints Latency'
    },
    legend: {
      position: 'bottom' as const
    }
  }
};

const chart2Data = {
  labels: endpointLatencyData[0].data.map((j) => j.time),
  datasets: endpointLatencyData.map((i, index) => ({
    label: i.name,
    data: i.data.map((j) => j.requests),
    backgroundColor: COLORS[index]
  }))
};

const chart3Options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'MRP by Plan'
    },
    legend: {
      position: 'bottom' as const
    }
  }
};

const chart3Data = {
  labels: mprByPlan.map((i) => i.name),
  datasets: [
    {
      data: mprByPlan.map((i) => i.value),
      backgroundColor: mprByPlan.map((i, index) => COLORS[index])
    }
  ]
};

// const { data, isLoading, error } = useQuery(
//   'appStats',
//   AnalyticsService.getAppMrr
// );
const Component = () => (
  <DashboardLayout>
    <Head>
      <title>Analytics - {config.meta.title}</title>
    </Head>
    <BarChartJs options={chart1Options} data={chart1Data} />
    <LineChartJs options={chart2Options} data={chart2Data} />
    <div className="flex justify-center px-[300px]">
      <Doughnut options={chart3Options} data={chart3Data} />
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
