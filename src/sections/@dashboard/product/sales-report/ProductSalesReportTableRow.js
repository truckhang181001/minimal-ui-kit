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
import { fNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProductSalesReportTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProductSalesReportTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const {
    id, name, platform, storeId, storeName, totalGrossSales, previousTotalGrossSales,
    totalNetSales, previousTotalNetSales, totalUnitsSold, previousTotalUnitsSold,
  } = row;

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
        </Stack>
      </TableCell>

      <TableCell align="left">
        <Label variant="filled" color="primary">
          {fNumber(totalGrossSales)}
        </Label>
      </TableCell>

      <TableCell align="left">{fNumber(previousTotalGrossSales)}</TableCell>

      <TableCell align="left">
        <Label variant="filled" color="info">
          {fNumber(totalNetSales)}
        </Label>
      </TableCell>

      <TableCell align="left">{fNumber(previousTotalNetSales)}</TableCell>

      <TableCell align="left">
        <Label variant="filled" color="warning">
          {fNumber(totalUnitsSold)}
        </Label>
      </TableCell>

      <TableCell align="left">{fNumber(previousTotalUnitsSold)}</TableCell>

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
