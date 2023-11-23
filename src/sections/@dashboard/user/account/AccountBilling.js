import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Grid, Stack } from '@mui/material';
//
// import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';

AccountBilling.propTypes = {
  addressBook: PropTypes.array,
  cards: PropTypes.array,
  invoices: PropTypes.array,
};

// eslint-disable-next-line no-unused-vars
export default function AccountBilling({ cards, addressBook, invoices }) {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AccountBillingPaymentMethod
            cards={cards}
            isOpen={open}
            onOpen={() => setOpen(!open)}
            onCancel={() => setOpen(false)}
          />

          {/* <AccountBillingAddressBook addressBook={addressBook} /> */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
