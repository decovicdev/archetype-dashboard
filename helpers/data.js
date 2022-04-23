import { Progress } from 'antd';
import { abbreviateNumber as num } from 'js-abbreviation-number';

export const requestsBreakdownData = Array(60)
  .fill(0)
  .map((_, index) => ({
    time: `${Math.floor((9 * 60 + 30 + index) / 60)}:${Math.floor(
      (9 * 60 + 30 + index) % 60
    )}`,
    requests: Math.floor(Math.random() * 100) + 300
  }));

export const endpointLatencyData = Array(6)
  .fill(0)
  .map((_, seriesIndex) => ({
    name: `p${(5 + seriesIndex * 2.5) * 10}`,
    data: Array(60)
      .fill(0)
      .map((_, index) => ({
        time: `${Math.floor((9 * 60 + 30 + index) / 60)}:${Math.floor(
          (9 * 60 + 30 + index) % 60
        )}`,
        requests: Math.floor(Math.random() * 100) + seriesIndex * 100
      }))
  }));

export const mrpOverviewData = Array(8)
  .fill(0)
  .map((_, index) => ({
    time: `${Math.floor((9 * 60 + 30 + index) / 60)}:${Math.floor(
      (9 * 60 + 30 + index) % 60
    )}`,
    new: Math.floor(Math.random() * 500) + index * 100,
    upgrades: Math.floor(Math.random() * 400) + index * 100,
    existing: Math.floor(Math.random() * 300) + index * 100,
    downgrades: Math.floor(Math.random() * 200) + index * 100,
    churn: Math.floor(Math.random() * 100) + index * 100
  }));

export const mprByPlan = [
  { name: 'Growth Plan', value: 565522 },
  { name: 'Starte Plan', value: 364780 },
  { name: 'Team Plan', value: 190958 },
  { name: 'Power User Plan', value: 119318 }
];

export const columns = [
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'REQUESTS',
    dataIndex: 'requests',
    key: 'requests',
    render: (value) => (
      <>
        <span>{num(value, 2)}</span>
        <Progress size="small" percent={value / 100} showInfo={false} />
      </>
    )
  },
  {
    title: 'AVG LATENCY',
    dataIndex: 'avgLatency',
    key: 'avgLatency',
    render: (value) => (
      <>
        <span>{num(value, 1)}ms</span>
        <Progress size="small" percent={value / 10} showInfo={false} />
      </>
    )
  },
  {
    title: 'P99 LATENCY',
    key: 'p99Latency',
    dataIndex: 'p99Latency',
    render: (value) => (
      <>
        <span>{num(value, 1, { symbols: ['s', 'min', 'h'] })}</span>
        <Progress size="small" percent={value / 100} showInfo={false} />
      </>
    )
  },
  {
    title: 'TOTAL TIME',
    key: 'totalTime',
    dataIndex: 'totalTime',
    render: (value) => (
      <>
        <span>{num(value, 1)}min</span>
        <Progress size="small" percent={value} showInfo={false} />
      </>
    )
  },
  {
    title: 'ERRORS',
    key: 'errors',
    dataIndex: 'errors',
    render: (value) => (
      <>
        <span>{num(value, 2)}</span>
        <Progress size="small" percent={value / 100} showInfo={false} />
      </>
    )
  },
  {
    title: 'ERROR RATE',
    key: 'errorRate',
    dataIndex: 'errorRate',
    render: (value) => (
      <>
        <span>{(value / 100).toFixed(2)}%</span>
        <Progress size="small" percent={value / 200} showInfo={false} />
      </>
    )
  }
];

export const endpointOverview = Array(20)
  .fill(0)
  .map((_, index) => ({
    key: `${index}`,
    name: 'New api event',
    requests: Math.floor(Math.random() * 8000) + 2000,
    avgLatency: Math.floor(Math.random() * 600) + 50,
    p99Latency: Math.floor(Math.random() * 8000) + 2000,
    totalTime: Math.floor(Math.random() * 54) + 8,
    errors: Math.floor(Math.random() * 1000),
    errorRate: Math.floor(Math.random() * 1000)
  }));
