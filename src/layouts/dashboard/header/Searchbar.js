/* eslint-disable no-unused-vars */
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  TextField,
  MenuItem,
  Stack,
  Box,
} from '@mui/material';
// utils
import DatePicker from '@mui/lab/DatePicker';
import cssStyles from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  ...cssStyles(theme).bgBlur(),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------
const INPUT_WIDTH = 200;
const optionsPlatform = ['all', 'Grab Food', 'Now', 'GoFood', 'Loship'];
const optionsStore = ['all', 'Nguyen Tri Phuong', 'Nguyen Dinh Chieu', 'Tran Quang Khai'];
// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const { translate } = useLocales();
  const [platform, setPlatform] = useState('all');
  const [store, setStore] = useState('all');
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0, 0)));
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59)));

  const handleChangeStartDate = (time) => {
    setStartDate(new Date(new Date(time).setHours(0, 0)));
    if (time > endDate) {
      setEndDate(new Date(new Date(time).setHours(23, 59)));
    }
  };

  const handleChangeEndDate = (time) => {
    setEndDate(new Date(new Date(time).setHours(23, 59)));
    if (time < startDate) {
      setStartDate(new Date(new Date(time).setHours(0, 0)));
    }
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFilterFlatform = (event) => {
    setPlatform(event.target.value);
  };

  const onFilterStore = (event) => {
    setStore(event.target.value);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box width="90%">
        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>

        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
          <TextField
            fullWidth
            select
            label="Flatform"
            value={platform}
            onChange={onFilterFlatform}
            SelectProps={{
              MenuProps: {
                sx: { '& .MuiPaper-root': { maxHeight: 260 } },
              },
            }}
            sx={{
              maxWidth: { md: INPUT_WIDTH },
              textTransform: 'capitalize',
            }}
          >
            {optionsPlatform.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Store"
            value={store}
            onChange={onFilterStore}
            SelectProps={{
              MenuProps: {
                sx: { '& .MuiPaper-root': { maxHeight: 260 } },
              },
            }}
            sx={{
              maxWidth: { md: INPUT_WIDTH },
              textTransform: 'capitalize',
            }}
          >
            {optionsStore.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            maxDate={new Date()}
            label={translate('startDate')}
            value={startDate}
            onChange={handleChangeStartDate}
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
            maxDate={new Date()}
            label={translate('endDate')}
            value={endDate}
            onChange={handleChangeEndDate}
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

          {!isOpen && (
            <IconButtonAnimate onClick={handleOpen}>
              <Iconify icon={'eva:search-fill'} width={20} height={20} />
            </IconButtonAnimate>
          )}
        </Stack>
      </Box>
    </ClickAwayListener>
  );
}
