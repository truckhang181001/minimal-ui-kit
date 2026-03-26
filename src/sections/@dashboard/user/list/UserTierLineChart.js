import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
//
import { BaseOptionChart } from '../../../../components/chart';
import { fDayMoth } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

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
        <ReactApexChart
          type="area"
          series={data.map((item) => ({ name: item.name, data: item.values }))}
          options={chartOptions}
          height={364}
        />
      </Box>

    </Card>
  );
}

UserTierLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      values: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
