import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
//
import { MaintenanceIllustration } from '../assets';
import useLocales from '../hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Maintenance() {
  const { translate } = useLocales();
  return (
    <Page title="Maintenance" sx={{ height: 1 }}>
      <RootStyle>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('titleMaintenance')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{translate('maintenanceText')}</Typography>

          <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

          <Button variant="contained" size="large" component={RouterLink} to="/">
            {translate('gotoHome')}
          </Button>
        </Container>
      </RootStyle>
    </Page>
  );
}
