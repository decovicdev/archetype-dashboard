
import Head from 'next/head';
import Chart from 'react-google-charts';
import config from '../config';

import Calendar from './_common/Calendar';

const options = {
  titleTextStyle: {
    color: '#ffffff'
  },
  backgroundColor: 'transparent',
  hAxis: {
    gridlines: {
      color: 'transparent'
    },
    baseline: [11, 0, 0],
    baselineColor: '#ffffff',
    textStyle: {
      color: '#ffffff'
    },
    minValue: [11, 0, 0],
    format: 'HH:mm'
  },
  vAxis: {
    gridlines: {
      color: 'transparent'
    },
    baselineColor: '#ffffff',
    textStyle: {
      color: '#ffffff'
    }
  },
  // For the legend to fit, we make the chart area smaller
  chartArea: { width: '90%', height: '70%' },
  legend: 'none',
  colors: ['#ffffff']
};

const Component = () => (
  <div className="page analytics-page">
    <Head>
      <title>Analytics - {config.meta.title}</title>
      <meta name="description" content={config.meta.description} />
      <meta name="keywords" content={config.meta.keywords} />
    </Head>
    <div className="content">
      <div className="header">
        <h1>Analytics</h1>
        <Calendar />
      </div>

      <div className="chart">
        <Chart
          width="100%"
          height="400px"
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Time', 'API Calls'],
            [[11, 0, 0], 0],
            [[11, 30, 0], 100],
            [[11, 45, 0], 50],
            [[12, 0, 0], 100],
            [[12, 15, 0], 200],
            [[13, 0, 0], 200],
            [[13, 30, 0], 100],
            [[14, 15, 0], 100],
            [[14, 30, 0], 50],
            [[15, 0, 0], 200],
            [[15, 30, 0], 200]
          ]}
          options={{
            ...options,
            title: 'Number of API calls over time',
            colors: ['#acb4df']
          }}
        />
      </div>

      <div className="row">
        <div className="chart">
          <Chart
            width="100%"
            height="400px"
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Time', 'Latency'],
              [[11, 15, 0], 70],
              [[11, 30, 0], 35],
              [[11, 45, 0], 60],
              [[12, 0, 0], 40],
              [[12, 15, 0], 55],
              [[12, 30, 0], 20],
              [[12, 45, 0], 90],
              [[13, 0, 0], 60]
            ]}
            options={{
              ...options,
              title: 'Average latency over time',
              chartArea: { width: '85%', height: '70%' },
              colors: ['#9BA8F6'],
              bar: {
                groupWidth: 15
              }
            }}
          />
        </div>

        <div className="chart">
          <Chart
            width="100%"
            height="400px"
            chartType="ScatterChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Time', '200', '300', '400', '500'],
              [[11, 15, 0], 15, 50, null, null],
              [[11, 22, 30], null, null, 75, null],
              [[11, 30, 0], 15, null, null, null],
              [[11, 45, 0], null, null, null, 100],
              [[11, 52, 30], null, null, 75, null],
              [[12, 0, 0], null, 50, null, null],
              [[12, 15, 0], 15, null, 75, null],
              [[12, 30, 0], null, 50, null, 100],
              [[12, 52, 30], null, 50, null, null],
              [[13, 0, 0], 15, null, null, 100]
            ]}
            options={{
              ...options,
              title: 'Error type over time',
              legend: {
                position: 'top',
                alignment: 'center',
                textStyle: {
                  color: '#ffffff',
                  fontSize: 16
                }
              },
              pointShape: 'square',
              pointSize: 40,
              chartArea: { width: '85%', height: '65%' },
              colors: ['#FDC043', '#E545E7', '#606BF1', '#6BD689']
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Component;
