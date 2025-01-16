import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Container,
  Divider,
  FormControlLabel, Grid,
  IconButton,
  Switch,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tabs,
  Tooltip,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
// utils
import axios from '../../../utils/axios';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import { fInstant } from '../../../utils/formatTime';
import {
  ProductPerDistrictCircleChart,
  ProductPerDistrictReportTableRow,
  ProductPerDistrictReportTableToolbar, ProductPerDistrictStatistics,
} from '../../../sections/@dashboard/map/product-per-district';
import { UserTierCircleChart, UserTierLineChart } from '../../../sections/@dashboard/user/list';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all'];

const PLATFORM_OPTIONS = new Map([
  ['ALL', null],
  ['GRAB', 'GRAB'],
  ['SHOPEE', 'SHOPEE'],
  ['BE', 'BE'],
]);

const STORE_OPTIONS = new Map([['ALL', null]]);

const START_DATE = new Date();
START_DATE.setMonth(START_DATE.getMonth() - 1);

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'totalGrossSales', label: 'Gross Sales', align: 'left' },
  { id: 'previousTotalGrossSales', label: 'Previous Gross Sales', align: 'left' },
  { id: 'totalNetSales', label: 'Net Sales', align: 'left' },
  { id: 'previousTotalNetSales', label: 'Previous Net Sales', align: 'left' },
  { id: 'totalUnitsSold', label: 'Units Sold', align: 'left' },
  { id: 'previousTotalUnitsSold', label: 'Previous Unit Sold', align: 'left' },
  { id: '' },
];

export default function ProductSalesReport() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'totalGrossSales', defaultOrder: 'desc' });

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [productPerDistrict, setProductPerDistrict] = useState({ keys: [], data: [] })

  const [filterName, setFilterName] = useState('');

  const [filterPlatform, setFilterPlatform] = useState('ALL');

  const [filterStore, setFilterStore] = useState('ALL');

  const [filterStartDate, setFilterStartDate] = useState(START_DATE);

  const [filterEndDate, setFilterEndDate] = useState(new Date());

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  const handleFilterPlatform = (event) => {
    setFilterPlatform(event.target.value);
    setFilterStore('ALL');
  };

  const handleFilterStore = (event) => {
    setFilterStore(event.target.value);
  };

  const handleFilterStartDate = (date) => {
    setFilterStartDate(date);
  };

  const handleFilterEndDate = (date) => {
    setFilterEndDate(date);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const denseHeight = dense ? 52 : 72;

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const isNotFound = ((!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterPlatform));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/v1/stores/all');
        response.data.forEach((store) => {
          STORE_OPTIONS.set(`${store.platform} - ${store.name}`, { id: store.id, platform: store.platform });
        });

      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/v1/orders/insight/total-per-district?`
          .concat(`&startDate=${fInstant(filterStartDate)}`)
          .concat(`&endDate=${fInstant(filterEndDate, true)}`)
          .concat(`&platform=${PLATFORM_OPTIONS.get(filterPlatform) || ''}`)
          .concat(`&storeId=${STORE_OPTIONS.get(filterStore) ? STORE_OPTIONS.get(filterStore).id : ''}`)
        );
        setProductPerDistrict(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [filterPlatform, filterStore, filterStartDate, filterEndDate])

  return (
    <Page title="Map: Order Per District">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Map: Order Per District"
          links={[
            { name: 'Product' },
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
          ]}
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <ProductPerDistrictReportTableToolbar
            filterName={filterName}
            filterPlatform={filterPlatform}
            onFilterName={handleFilterName}
            onFilterPlatform={handleFilterPlatform}
            optionsPlatform={Array.from(PLATFORM_OPTIONS.keys())}
            filterStartDate={filterStartDate}
            onFilterStartDate={handleFilterStartDate}
            filterEndDate={filterEndDate}
            onFilterEndDate={handleFilterEndDate}
            filterStore={filterStore}
            onFilterStore={handleFilterStore}
            optionsStore={getStoreOptionsByPlatform(filterPlatform, PLATFORM_OPTIONS, STORE_OPTIONS)}
          />

          <Grid container spacing={3}>

            <Grid item xs={12} md={6} lg={4}>
              <ProductPerDistrictCircleChart
                labels={productPerDistrict.keys}
                data={productPerDistrict.data.length > 0 ? productPerDistrict.data[0].values : []} />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <ProductPerDistrictStatistics data={productPerDistrict.data} categories={productPerDistrict.keys}/>
            </Grid>

          </Grid>
        </Card>
      </Container>
    </Page>
  );
}

function applySortFilter({ tableData, comparator, filterName }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}

function getStoreOptionsByPlatform(platform, platformOptions, storeOptions) {

  const filterPlatform = platformOptions.get(platform);

  if (!filterPlatform) {
    console.log(Array.from(storeOptions.keys()));
    return Array.from(storeOptions.keys());
  }

  const filtered = ['ALL'];
  storeOptions.forEach((value, key) => {
    if (value && value.platform === filterPlatform) {
      filtered.push(key);
    }
  });

  return filtered;
}
