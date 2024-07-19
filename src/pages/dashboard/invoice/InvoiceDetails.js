import { useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';

// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _invoices } from '../../../_mock';
// utils
import axios from '../../../utils/axios';
// hooks
import useSettings from '../../../hooks/useSettings';
import useLocales from '../../../hooks/useLocales';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import Invoice from '../../../sections/@dashboard/invoice/details';

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  const { id } = useParams();

  const [invoice, setInvoice] = useState()

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/v1/orders/${id}`);
        setInvoice(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('invoiceDetails')}
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('invoice'),
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: id || '' },
          ]}
        />

        <Invoice invoice={invoice} />
      </Container>
    </Page>
  );
}
