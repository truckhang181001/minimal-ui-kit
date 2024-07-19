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

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { name, value, totalOrder, totalOrderItem, grossSales, netSales } = row;

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

      <TableCell align="left">
        <Label variant="filled" color="primary">
          {name}
        </Label>
      </TableCell>

      <TableCell align="left">{fNumber(value)}</TableCell>

      <TableCell align="left">{fNumber(grossSales)}</TableCell>

      <TableCell align="left">{fNumber(netSales)}</TableCell>

      <TableCell align="left">{fNumber(totalOrderItem/totalOrder)}</TableCell>

      <TableCell align="left">{fNumber(grossSales/value)}</TableCell>

      <TableCell align="left">{fNumber(grossSales/totalOrder)}</TableCell>

      <TableCell align="left">{fNumber(totalOrder)}</TableCell>

    </TableRow>
  );
}
