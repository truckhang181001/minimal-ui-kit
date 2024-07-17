import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Stack } from '@mui/material';
import createAvatar from '../../../../utils/createAvatar';
import { fDateTime } from '../../../../utils/formatTime';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

ProductFeedbackReportTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProductFeedbackReportTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { id, name, platform, storeId, storeName, totalFeedback, fiveStar, fourStar, threeStar, twoStar, oneStar } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name || '-'} color={createAvatar(name || '-').color} sx={{ mr: 2 }}>
          {createAvatar(name || '-').name}
        </Avatar>
        <Stack>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
          <Typography variant="subtitle3" noWrap>
            {`${storeName.slice(storeName.indexOf('Ulangon'))} - ${platform}`}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="center">
        <Label variant='filled' color='info'>
          {totalFeedback}
        </Label>
      </TableCell>

      <TableCell align="center">
        <Label variant='filled' color='primary'>
          {fiveStar}
        </Label>
      </TableCell>

      <TableCell align="center">
        <Label variant='filled' color='primary'>
          {fourStar}
        </Label>
      </TableCell>

      <TableCell align="center">
        <Label variant='filled' color='default'>
          {threeStar}
        </Label>
      </TableCell>

      <TableCell align="center">
        <Label variant='filled' color='default'>
          {twoStar}
        </Label>
      </TableCell>

      <TableCell align="center">
        <Label variant='filled' color='default'>
          {oneStar}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
