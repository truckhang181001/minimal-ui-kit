import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
import { _contacts } from '../../../_mock';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

const ITEM_HEIGHT = 64;

export default function ContactsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Our other partners
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {_contacts.map((contact) => (
            <MenuItem key={contact.id}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src={contact.avatar} />
              </ListItemAvatar>

              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={contact.name}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
