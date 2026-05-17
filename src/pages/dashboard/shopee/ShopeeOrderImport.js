import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import useLocales from '../../../hooks/useLocales';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fileName',    label: 'File Name' },
  { id: 'storeName',   label: 'Store' },
  { id: 'parsedCount', label: 'Parsed' },
  { id: 'savedCount',  label: 'Saved' },
  { id: 'createdAt',   label: 'Uploaded At' },
];

// ----------------------------------------------------------------------

export default function ShopeeOrderImport() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  // ── stores ──────────────────────────────────────────────────────────
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  // ── upload ───────────────────────────────────────────────────────────
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null); // { type: 'success'|'error', message }

  // ── history ──────────────────────────────────────────────────────────
  const [historyStore, setHistoryStore] = useState(null); // filter
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [historyRows, setHistoryRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // ── fetch stores on mount ─────────────────────────────────────────────
  useEffect(() => {
    axios.get('/api/v1/stores/all')
      .then((res) => setStores(res.data.filter((s) => s.platform === 'SHOPEE')))
      .catch(console.error);
  }, []);

  // ── fetch upload history ──────────────────────────────────────────────
  useEffect(() => {
    const fetchHistory = async () => {
      setHistoryLoading(true);
      try {
        const params = { page, size: rowsPerPage };
        const url = historyStore
          ? `/api/v1/shopee/upload-history/store/${historyStore.id}`
          : '/api/v1/shopee/upload-history';
        const res = await axios.get(url, { params });
        setHistoryRows(res.data.content);
        setTotalElements(res.data.totalElements);
      } catch (err) {
        console.error(err);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, [historyStore, page, rowsPerPage, refreshKey]);

  // ── handlers ──────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
    // reset input so the same file can be re-selected after an upload
    e.target.value = '';
  };

  const handleUpload = async () => {
    if (!selectedStore || !selectedFile) return;
    setUploading(true);
    setUploadResult(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const res = await axios.post(
        `/api/v1/shopee/upload-order-report?storeId=${selectedStore.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const { parsedCount, savedCount } = res.data;
      setUploadResult({
        type: 'success',
        message: `Import successful — ${parsedCount} rows parsed, ${savedCount} orders saved.`,
      });
      setSelectedFile(null);
      // reset to first page and trigger history reload
      setPage(0);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setUploadResult({
        type: 'error',
        message: err?.response?.data?.message || err.message || 'Upload failed.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // ── render ─────────────────────────────────────────────────────────────
  return (
    <Page title="Shopee Import">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Shopee Order Import"
          links={[
            { name: translate('dashboard'), href: PATH_DASHBOARD.root },
            { name: 'Shopee', href: PATH_DASHBOARD.shopee.root },
          ]}
        />

        {/* ── Upload Card ───────────────────────────────────────────── */}
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Upload Order Report (.xlsx)" />
          <Divider />
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
              {/* Store selector */}
              <Autocomplete
                sx={{ minWidth: 260 }}
                options={stores}
                getOptionLabel={(o) => o.name || o.id}
                value={selectedStore}
                onChange={(_, v) => setSelectedStore(v)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Store" size="small" />
                )}
              />

              {/* File picker */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:attach-fill" />}
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? selectedFile.name : 'Choose File'}
              </Button>

              {/* Upload button */}
              <Button
                variant="contained"
                color="warning"
                disabled={!selectedStore || !selectedFile || uploading}
                startIcon={
                  uploading
                    ? <CircularProgress size={16} color="inherit" />
                    : <Iconify icon="eva:upload-fill" />
                }
                onClick={handleUpload}
              >
                {uploading ? 'Uploading…' : 'Upload'}
              </Button>
            </Stack>

            {/* Result alert */}
            {uploadResult && (
              <Box sx={{ mt: 2 }}>
                <Alert severity={uploadResult.type} onClose={() => setUploadResult(null)}>
                  {uploadResult.message}
                </Alert>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* ── History Card ─────────────────────────────────────────── */}
        <Card sx={{ mt: 1 }}>
          <CardHeader
            title="Upload History"
            sx={{ px: 3, pt: 3, pb: 1 }}
            action={
              <Autocomplete
                sx={{ minWidth: 220 }}
                options={stores}
                getOptionLabel={(o) => o.name || o.id}
                value={historyStore}
                onChange={(_, v) => { setHistoryStore(v); setPage(0); }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by Store" size="small" />
                )}
              />
            }
          />
          <Divider />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 700 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((col) => (
                      <TableCell key={col.id}>{col.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {historyLoading && (
                    <TableRow>
                      <TableCell colSpan={TABLE_HEAD.length} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={28} />
                      </TableCell>
                    </TableRow>
                  )}
                  {!historyLoading && historyRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={TABLE_HEAD.length} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          No records found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {!historyLoading && historyRows.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Iconify icon="eva:file-text-fill" sx={{ color: 'warning.main' }} />
                            <Typography variant="body2" noWrap sx={{ maxWidth: 240 }}>
                              {row.fileName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{row.storeName}</TableCell>
                        <TableCell>
                          <Chip label={row.parsedCount} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip label={row.savedCount} size="small" color="success" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {row.createdAt ? fDateTime(row.createdAt) : '—'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
