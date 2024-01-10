import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { AppWidgetSummary, LineChart } from '../../sections/@dashboard/general/app';
// import useLocales from '../../hooks/useLocales';

const CHART_DATA_WEEK = [
  {
    time: 'Week 1',
    data: [
      { name: 'Grab Food', data: [10, 41, 35, 51, 49, 62, 69] },
      { name: 'GoFood', data: [10, 34, 13, 56, 77, 88, 50] },
    ],
  },
  {
    time: 'Week 2',
    data: [
      { name: 'Grab Food', data: [148, 91, 69, 62, 49, 51, 35] },
      { name: 'GoFood', data: [45, 77, 99, 88, 77, 56, 40] },
    ],
  },
  {
    time: 'Week 3',
    data: [
      { name: 'Grab Food', data: [148, 45, 69, 62, 49, 51, 67] },
      { name: 'GoFood', data: [45, 56, 99, 88, 77, 56, 66] },
    ],
  },
  {
    time: 'Week 4',
    data: [
      { name: 'Grab Food', data: [148, 45, 69, 62, 49, 51, 67] },
      { name: 'GoFood', data: [45, 56, 99, 88, 77, 56, 66] },
    ],
  },
];

const CHART_DATA_HOUR = [
  {
    time: 'Today',
    data: [
      {
        name: 'Grab Food',
        data: [6, 14, 3, 18, 5, 11, 2, 16, 10, 9, 19, 1, 8, 12, 7, 15],
      },
      { name: 'GoFood', data: [9, 3, 16, 12, 8, 5, 14, 1, 11, 10, 2, 19, 6, 18, 7, 15] },
    ],
  },
  {
    time: 'Yesterday',
    data: [
      {
        name: 'Grab Food',
        data: [11, 2, 7, 15, 10, 16, 3, 6, 12, 1, 5, 14, 18, 9, 8, 19],
      },
      {
        name: 'GoFood',
        data: [5, 16, 3, 8, 11, 19, 2, 14, 7, 15, 1, 9, 6, 10, 12, 18],
      },
    ],
  },
  {
    time: '2 day ago',
    data: [
      {
        name: 'Grab Food',
        data: [10, 5, 3, 18, 14, 9, 6, 11, 2, 1, 8, 15, 19, 12, 7, 16],
      },
      {
        name: 'GoFood',
        data: [1, 7, 16, 12, 15, 18, 2, 8, 3, 11, 9, 10, 5, 14, 6, 19],
      },
    ],
  },
];

const CHART_DATA_YEAR = [
  {
    time: '2019',
    data: [
      { name: 'Shoppe Food', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100, 105, 110] },
      { name: 'Now', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 90, 95, 100] },
      // { name: 'Vietnam', data: [10, 20, 30, 60, 70, 88, 89, 22, 44, 92, 94, 76] },
    ],
  },
  {
    time: '2020',
    data: [
      { name: 'Shoppe Food', data: [148, 91, 69, 62, 49, 51, 35, 41, 10, 100, 105, 110] },
      { name: 'Now', data: [45, 77, 99, 88, 77, 56, 13, 34, 10, 90, 95, 100] },
    ],
  },
  {
    time: '2021',
    data: [
      { name: 'Shoppe Food', data: [148, 45, 69, 62, 49, 51, 67, 41, 10, 12, 105, 110] },
      { name: 'Now', data: [45, 56, 99, 88, 77, 56, 66, 34, 10, 90, 95, 24] },
    ],
  },
];

const ARRAY_X_CHART_HOUR = [
  '7h',
  '8h',
  '9h',
  '10h',
  '11h',
  '12h',
  '13h',
  '13h',
  '15h',
  '16h',
  '17h',
  '18h',
  '19h',
  '20h',
  '21h',
  '22h',
];

const ARRAY_X_CHART_YEAR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ARRAY_X_CHART_WEEK = ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function GeneralApp() {
  // const { user } = useAuth();
  // const { translate } = useLocales();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={8}>
            <AppWelcome displayName={user?.displayName} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid> */}

          <Grid item xs={12} md={3}>
            <AppWidgetSummary title="Gross Sales" percent={2.6} total={18765} chartColor={theme.palette.primary.main} />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary title={'Net Sales'} percent={0.2} total={4876} chartColor={theme.palette.chart.blue[0]} />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title={'Transaction'}
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary title={'Average'} percent={-0.1} total={678} chartColor={theme.palette.chart.red[0]} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <LineChart
              chartData={CHART_DATA_YEAR}
              horizontalArray={ARRAY_X_CHART_YEAR}
              title="Line chart day"
              subheader="ab ABCc"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <LineChart
              chartData={CHART_DATA_WEEK}
              horizontalArray={ARRAY_X_CHART_WEEK}
              title="Line chart week"
              subheader="abc xyx"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <LineChart
              chartData={CHART_DATA_HOUR}
              horizontalArray={ARRAY_X_CHART_HOUR}
              title="Line chart hour"
              subheader="abc xyz"
            />
          </Grid>

          {/* circle chart */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid> */}

          {/* 
          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid> */}

          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
