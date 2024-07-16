import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
// components
import Iconify from '../../../../components/Iconify';
import useLocales from '../../../../hooks/useLocales';

// ----------------------------------------------------------------------

OrderItemTableToolbar.propTypes = {
  filterPlatform: PropTypes.string,
  optionsPlatform: PropTypes.arrayOf(PropTypes.string),
  onFilterPlatform: PropTypes.func,
  filterStore: PropTypes.string,
  optionsStore: PropTypes.arrayOf(PropTypes.string),
  onFilterStore: PropTypes.func,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  onFilterEndDate: PropTypes.func,
  onFilterStartDate: PropTypes.func,
  filterPromo: PropTypes.string,
  onFilterPromo: PropTypes.func,
  optionsPromo: PropTypes.arrayOf(PropTypes.string),
};

const INPUT_WIDTH = 160;

export default function OrderItemTableToolbar({
                                                filterPlatform, onFilterPlatform, optionsPlatform,
                                                filterStore, optionsStore, onFilterStore,
                                                filterEndDate, filterStartDate, onFilterEndDate, onFilterStartDate,
                                                filterPromo, onFilterPromo, optionsPromo
                                              }) {
  const { translate } = useLocales();
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Platform"
        value={filterPlatform}
        onChange={onFilterPlatform}
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
        {optionsPlatform.map((key) => (
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

      <TextField
        fullWidth
        select
        label="Store"
        value={filterStore}
        onChange={onFilterStore}
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
        {optionsStore.map((key) => (
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

      <TextField
        fullWidth
        select
        label="Is Promo Included"
        value={filterPromo}
        onChange={onFilterPromo}
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
        {optionsPromo.map((key) => (
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
    </Stack>
  );
}
