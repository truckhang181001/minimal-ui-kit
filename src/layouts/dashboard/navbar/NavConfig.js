import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = (translate) => [
  // GENERAL
  {
    subheader: translate('generalUpcase'),
    items: [
      { title: translate('app'), path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: translate('e-commerce'), path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: translate('analytics'), path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: translate('banking'), path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: translate('booking'), path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },
  // MANAGEMENT
  {
    subheader: translate('managementUpcase'),
    items: [
      // USER
      {
        title: translate('user'),
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: translate('cards'), path: PATH_DASHBOARD.user.cards },
          { title: translate('list'), path: PATH_DASHBOARD.user.list },
          { title: translate('create'), path: PATH_DASHBOARD.user.new },
          { title: translate('edit'), path: PATH_DASHBOARD.user.demoEdit },
          { title: translate('account'), path: PATH_DASHBOARD.user.account },
        ],
      },

      // E-COMMERCE
      {
        title: translate('e-commerce'),
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: translate('shop'), path: PATH_DASHBOARD.eCommerce.shop },
          { title: translate('product'), path: PATH_DASHBOARD.eCommerce.demoView },
          { title: translate('list'), path: PATH_DASHBOARD.eCommerce.list },
          { title: translate('create'), path: PATH_DASHBOARD.eCommerce.new },
          { title: translate('edit'), path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: translate('checkout'), path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },

      // INVOICE
      {
        title: translate('invoice'),
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: translate('list'), path: PATH_DASHBOARD.invoice.list },
          { title: translate('details'), path: PATH_DASHBOARD.invoice.demoView },
          { title: translate('create'), path: PATH_DASHBOARD.invoice.new },
          { title: translate('edit'), path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      // BLOG
      {
        title: translate('blog'),
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: translate('create'), path: PATH_DASHBOARD.blog.new },
        ],
      },
    ],
  },
];

export default navConfig;
