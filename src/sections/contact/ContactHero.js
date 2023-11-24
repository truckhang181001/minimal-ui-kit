import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { TextAnimate, MotionContainer, varFade } from '../../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(https://minimal-assets-api.vercel.app/assets/images/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

export default function ContactHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="How can" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="I" sx={{ mr: 2 }} />
            <TextAnimate text="help" sx={{ mr: 2 }} />
            <TextAnimate text="you?" />
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
