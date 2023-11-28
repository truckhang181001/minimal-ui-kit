import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { translate } = useLocales();

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  {translate('forgotYourPassowrd')}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>{translate('textForgotPassword')}</Typography>

                <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                  {translate('back')}
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  {translate('requestSentSuccessfully')}
                </Typography>
                <Typography>
                  {translate('sentTo')} &nbsp;
                  <strong>{email}</strong>
                  <br />
                  {translate('checkMail')}
                </Typography>

                <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                  {translate('back')}
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
