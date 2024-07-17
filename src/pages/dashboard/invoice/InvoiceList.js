import sumBy from 'lodash/sumBy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Stack,
  Switch,
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
// _mock_
import { _invoices } from '../../../_mock';
// utils
import axios from '../../../utils/axios';
import { fInstant } from '../../../utils/formatTime';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import InvoiceAnalytic from '../../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../../sections/@dashboard/invoice/list';
import useLocales from '../../../hooks/useLocales';

export default function InvoiceList() {
  const theme = useTheme();
  const { translate } = useLocales();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const TABLE_HEAD = [
    { id: 'orderId', label: translate('orderId'), align: 'center', width: 140 },
    { id: 'eater', label: translate('customer'), align: 'left' },
    { id: 'createTime', label: translate('createTime'), align: 'left' },
    { id: 'address', label: translate('address'), align: 'left' },
    { id: 'toal', label: translate('total'), align: 'center', width: 140 },
    // { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
  ];

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
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState([]);

  const [totalElement, setTotalElement] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [pressEnter, setPressEnter] = useState(false);

  const [filterService, setFilterService] = useState();

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus } = useTabs('all');

  const [invoice, setInvoice] = useState([]);

  const [stores, setStores] = useState(['All Stores']);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName === '') {
      setPressEnter(!pressEnter);
    }
  };

  const handlePressEnter = () => {
    setPressEnter(!pressEnter);
  };

  const handleFilterService = (event) => {
    let matchFlag = false;

    stores.forEach((storeItem) => {
      if (event.target.value === `${storeItem.platform} - ${storeItem.name}`) {
        setFilterService(storeItem.id ? storeItem.id : '');
        setInvoice([]);
        matchFlag = true;
      }
    });

    if (!matchFlag && filterService !== '') {
      console.log('Not match');
      setFilterService('');
      setInvoice([]);
    }

    setPage(0);
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
    navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  // eslint-disable-next-line no-unused-vars
  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData: invoice,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const denseHeight = dense ? 56 : 76;

  // const isNotFound =
  //   (!dataFiltered.length && !!filterName) ||
  //   (!dataFiltered.length && !!filterStatus) ||
  //   (!dataFiltered.length && !!filterService) ||
  //   (!dataFiltered.length && !!filterEndDate) ||
  //   (!dataFiltered.length && !!filterStartDate);

  // const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length;

  // const getTotalPriceByStatus = (status) =>
  //   sumBy(
  //     tableData.filter((item) => item.status === status),
  //     'totalPrice'
  //   );

  // const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/v1/stores/all');
        setStores([{ platform: 'ALL', name: 'STORE' }, ...response.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/orders?`
            .concat(`size=${rowsPerPage}`)
            .concat(`&page=${page}`)
            .concat(`&orderId=${filterName || ''}`)
            .concat(`&sort=createdAt%2Cdesc`)
            .concat(`&storeId=${filterService || ''}`)
            .concat(`&startDate=${filterStartDate ? fInstant(filterStartDate) : ''}`)
            .concat(`&endDate=${filterEndDate ? fInstant(filterEndDate) : ''}`)
        );
        setInvoice(response.data.content);
        setTableData(response.data.content);
        setTotalElement(response.data.totalElements);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [filterService, rowsPerPage, page, pressEnter, filterStartDate, filterEndDate]);

  return (
    <Page title="Invoice: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice List 🌻"
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            { name: translate('invoice'), href: PATH_DASHBOARD.invoice.root },
            { name: translate('list') },
          ]}
        />

        {/* <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Total"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalPrice')}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="Paid"
                total={getLengthByStatus('paid')}
                percent={getPercentByStatus('paid')}
                price={getTotalPriceByStatus('paid')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title="Unpaid"
                total={getLengthByStatus('unpaid')}
                percent={getPercentByStatus('unpaid')}
                price={getTotalPriceByStatus('unpaid')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title="Overdue"
                total={getLengthByStatus('overdue')}
                percent={getPercentByStatus('overdue')}
                price={getTotalPriceByStatus('overdue')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
              <InvoiceAnalytic
                title="Draft"
                total={getLengthByStatus('draft')}
                percent={getPercentByStatus('draft')}
                price={getTotalPriceByStatus('draft')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card> */}

        <Card>
          <InvoiceTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onPressEnter={handlePressEnter}
            onFilterService={handleFilterService}
            onFilterStartDate={handleFilterStartDate}
            onFilterEndDate={handleFilterEndDate}
            optionsService={stores.map((item) => `${item.platform} - ${item.name}`)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Sent">
                        <IconButton color="primary">
                          <Iconify icon={'ic:round-send'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download">
                        <IconButton color="primary">
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Print">
                        <IconButton color="primary">
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {invoice.map((row) => (
                    <InvoiceTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={invoice === null || invoice.length === 0} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalElement}
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

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.displayId.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.grabOrderId.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  // if (filterStatus !== 'all') {
  //   tableData = tableData.filter((item) => item.status === filterStatus);
  // }

  // if (filterService !== 'all') {
  //   tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  // }

  // if (filterStartDate && filterEndDate) {
  //   tableData = tableData.filter(
  //     (item) =>
  //       item.createDate.getTime() >= filterStartDate.getTime() && item.createDate.getTime() <= filterEndDate.getTime()
  //   );
  // }

  return tableData;
}
