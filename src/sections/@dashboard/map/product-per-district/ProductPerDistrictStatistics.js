import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 'Week',
    data: [
      { name: 'Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
      { name: 'Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
    ],
  },
];

export default function BankingBalanceStatistics({data, categories}) {

  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories
    }
  });

  return (
    <Card>
      <CardHeader
        title="Order Per District"
        // subheader="(+43% Income | +12% Expense) than last year"
      />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={data.map(item => {
          return { name: item.name, data: item.values };
        })} options={chartOptions} height={364} />
      </Box>

    </Card>
  );
}
