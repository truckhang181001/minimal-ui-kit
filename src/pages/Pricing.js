import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { _pricingPlans } from '../_mock';
import Page from '../components/Page';
import { PricingPlanCard } from '../sections/pricing';
import Payment from './Payment';

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function Pricing() {
  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Flexible plans for your
            <br /> community&apos;s size and needs
          </Typography>

          <Grid container spacing={3} mt={3}>
            {_pricingPlans.map((card, index) => (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard card={card} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>

        <Payment />
      </RootStyle>
    </Page>
  );
}
