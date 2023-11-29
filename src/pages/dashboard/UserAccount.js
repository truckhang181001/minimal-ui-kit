import { Container, Tab, Box, Tabs } from '@mui/material';
import { useEffect } from 'react';
import { PATH_DASHBOARD } from '../../routes/paths';
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
import { _userPayment, _userAddressBook, _userInvoices } from '../../_mock';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { AccountGeneral, AccountBilling, AccountChangePassword } from '../../sections/@dashboard/user/account';

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const { translate, currentLang } = useLocales();
  const { currentTab, onChangeTab, setCurrentTab } = useTabs(translate('general'));

  useEffect(() => {
    setCurrentTab(translate('general'));
  }, [currentLang, setCurrentTab, translate]);

  console.log('first', currentTab);

  const ACCOUNT_TABS = [
    {
      value: translate('general'),
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: translate('billing'),
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <AccountBilling cards={_userPayment} addressBook={_userAddressBook} invoices={_userInvoices} />,
    },
    {
      value: translate('change_password'),
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('account')}
          links={[
            { name: translate('home'), href: PATH_DASHBOARD.root },
            { name: translate('user'), href: PATH_DASHBOARD.user.root },
            { name: translate('accountSettings') },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          console.log(tab.value);
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
