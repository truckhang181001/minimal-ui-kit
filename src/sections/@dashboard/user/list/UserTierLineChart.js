import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
//
import { BaseOptionChart } from '../../../../components/chart';
import { fDayMoth } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
      { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
    ],
  },
];

export default function UserTierLineChart({ data, categories }) {

  categories = categories.map(category => fDayMoth(category));

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories,
    },
  });

  return (
    <Card>
      <CardHeader
        title="Yearly Sales"
        subheader="(+43%) than last year"
      />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="area" series={data.map(item => {
          return { name: item.name, data: item.values };
        })} options={chartOptions} height={364} />
      </Box>

    </Card>
  );
}
