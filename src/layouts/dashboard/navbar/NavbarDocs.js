import { Stack, Button } from '@mui/material';
// import useAuth from '../../../hooks/useAuth';
import { PATH_DOCS } from '../../../routes/paths';

export default function NavbarDocs() {
  // const { user } = useAuth();

  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 5, width: 1, textAlign: 'center', display: 'block' }}>
      <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained">
        Documentation
      </Button>
    </Stack>
  );
}
