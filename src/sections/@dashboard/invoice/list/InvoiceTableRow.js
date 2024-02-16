import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
// @mui
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
// components
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from '../../../../hooks/useLocales';
import { InvoicePrintRow } from './InvoicePrintRow';

InvoiceTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function InvoiceTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  // const theme = useTheme();
  const { grabOrderId, displayId, eater, address, fare, time } = row;
  const { translate } = useLocales();

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const printRowRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRowRef.current,
    pageStyle: `@media print {
      .grabfood-label-container{
        display: block !important;
      }
    }`
  });

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }} onClick={onViewRow}>
        <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'Black', cursor: 'pointer', fontWeight: 'bold' }}>
          {displayId}
        </Link>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={eater.name || "-"} color={createAvatar(eater.name || "-").color} sx={{ mr: 2 }}>
          {createAvatar(eater.name || "-").name}
        </Avatar>

        <Stack>
          <Typography variant="subtitle3" noWrap>
            {eater.name || "-"}
          </Typography>

          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {eater.mobileNumber || "-"}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{fDate(time.createdAt)}</TableCell>

      <TableCell align="left">{address.address}</TableCell>

      <TableCell align="center">{fare.totalDisplay} VND</TableCell>

      {/* <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'paid' && 'success') ||
            (status === 'unpaid' && 'warning') ||
            (status === 'overdue' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell> */}

      <InvoicePrintRow key={row.id} row={row} ref={printRowRef} />

      <TableCell align="right">
        {/* <TableMoreMenu
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
                {translate('delete')}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                {translate('view')}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {translate('edit')}
              </MenuItem>
            </>
          }
        /> */}
        <MenuItem
          onClick={() => {
            handlePrint();
            handleCloseMenu();
          }}
        >
          <Iconify icon={'twemoji:printer'}/>
        </MenuItem>
      </TableCell>
    </TableRow>
  );
}
