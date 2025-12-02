import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// utils
import axios from '../../../utils/axios';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import { ProductFeedbackReportTableToolbar, ProductFeedbackReportTableRow } from '../../../sections/@dashboard/product/feedback-report';
import { fDateTime, fInstant } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all'];

const PLATFORM_OPTIONS = new Map([
  ['ALL', null],
  ['GRAB', 'GRAB'],
  ['SHOPEE', 'SHOPEE'],
  ['BE', 'BE'],
  ['XANH NGON', 'XANH_NGON']
]);

const STORE_OPTIONS = new Map([['ALL', null]]);

const START_DATE = new Date();
START_DATE.setMonth(START_DATE.getMonth() - 1);

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'totalFeedback', label: 'Total', align: 'center' },
  { id: 'fiveStar', label: '5 star', align: 'center' },
  { id: 'fourStar', label: '4 star', align: 'center' },
  { id: 'threeStar', label: '3 star', align: 'center' },
  { id: 'twoStar', label: '2 star', align: 'center' },
  { id: 'oneStar', label: '1 star', align: 'center' },
  { id: '' },
];

export default function ProductFeedbackReport() {
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
  } = useTable({defaultOrderBy: 'totalFeedback', defaultOrder: 'desc'});

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterPlatform, setFilterPlatform] = useState('ALL');

  const [filterStore, setFilterStore] = useState('ALL');

  const [filterStartDate, setFilterStartDate] = useState(START_DATE);

  const [filterEndDate, setFilterEndDate] = useState(new Date());

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setTableData([])
    setFilterName(filterName);
  };

  const handleFilterPlatform = (event) => {
    setTableData([])
    setFilterPlatform(event.target.value);
    setFilterStore('ALL')
  };

  const handleFilterStore = (event) => {
    setTableData([])
    setFilterStore(event.target.value);
  }

  const handleFilterStartDate = (date) => {
    setTableData([])
    setFilterStartDate(date);
  };

  const handleFilterEndDate = (date) => {
    setTableData([])
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
          STORE_OPTIONS.set(`${store.platform} - ${store.name}`, {id: store.id, platform: store.platform});
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
        const response = await axios.get(`/api/v1/order-items/feedback?`
          .concat(`&platform=${PLATFORM_OPTIONS.get(filterPlatform) || ''}`)
          .concat(`&storeId=${STORE_OPTIONS.get(filterStore) ? STORE_OPTIONS.get(filterStore).id : ''}`)
          .concat(`&startDate=${fInstant(filterStartDate)}`)
          .concat(`&endDate=${fInstant(filterEndDate)}`),
        );
        setTableData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [filterPlatform, filterStore, filterStartDate, filterEndDate]);

  return (
    <Page title="Product: Feedback Report">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product: Feedback Report"
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

          <ProductFeedbackReportTableToolbar
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

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={dataFiltered.slice(0, rowsPerPage).length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      dataFiltered.slice(0, rowsPerPage).map((row) => row.id),
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.slice(0, rowsPerPage).length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      dataFiltered.slice(0, rowsPerPage).map((row) => row.id),
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(0, rowsPerPage).map((row) => (
                    <ProductFeedbackReportTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.name)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, dataFiltered.slice(0, rowsPerPage).length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={rowsPerPage < dataFiltered.length ? rowsPerPage : dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
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

  const filterPlatform = platformOptions.get(platform)

  if (!filterPlatform) {
    console.log(Array.from(storeOptions.keys()));
    return Array.from(storeOptions.keys());
  }

  const filtered = ['ALL'];
  storeOptions.forEach((value, key) => {
    if (value && value.platform === filterPlatform) {
      filtered.push(key);
    }
  })

  return filtered;
}
