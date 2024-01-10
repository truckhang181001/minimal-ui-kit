import PropTypes from 'prop-types';
// import ReactApexChart from 'react-apexcharts';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function AppWidgetSummary({ title, percent, total }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">{fNumber(total)}</Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
            <IconWrapperStyle
              sx={{
                ...(percent < 0 && {
                  color: 'error.main',
                  bgcolor: alpha(theme.palette.error.main, 0.16),
                }),
              }}
            >
              <Iconify width={16} height={16} icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
            </IconWrapperStyle>
            <Typography component="span" variant="subtitle2">
              {percent > 0 && '+'}
              {fPercent(percent)}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* <ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} /> */}
    </Card>
  );
}
