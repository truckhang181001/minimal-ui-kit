import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
// components
import Iconify from '../../../../components/Iconify';
import useLocales from '../../../../hooks/useLocales';

// ----------------------------------------------------------------------

RoamingOrderTableToolbar.propTypes = {
  filterMerchant: PropTypes.string,
  optionsMerchant: PropTypes.arrayOf(PropTypes.string),
  onFilterMerchant: PropTypes.func,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  onFilterEndDate: PropTypes.func,
  onFilterStartDate: PropTypes.func,
};

const INPUT_WIDTH = 160;

export default function RoamingOrderTableToolbar({
                                                filterMerchant, optionsMerchant, onFilterMerchant,
                                                filterEndDate, filterStartDate, onFilterEndDate, onFilterStartDate,
                                              }) {
  const { translate } = useLocales();
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>

      <TextField
        fullWidth
        select
        label="Store"
        value={filterMerchant}
        onChange={onFilterMerchant}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsMerchant.map((key) => (
          <MenuItem
            key={key}
            value={key}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {key}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker
        label={translate('startDate')}
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <DatePicker
        label={translate('endDate')}
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />
    </Stack>
  );
}
