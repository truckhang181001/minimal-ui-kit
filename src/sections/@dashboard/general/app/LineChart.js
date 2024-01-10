import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { BaseOptionChart } from '../../../../components/chart';

LineChart.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  horizontalArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
};

export default function LineChart({ chartData, horizontalArray, title, subheader }) {
  const [seriesData, setSeriesData] = useState(chartData[0].time);

  const handleChangeSeriesData = (event) => {
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [...horizontalArray],
    },
  });

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {chartData.map((option) => (
              <option key={option.time} value={option.time}>
                {option.time}
              </option>
            ))}
          </TextField>
        }
      />

      {chartData.map((item) => (
        <Box key={item.time} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.time === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
