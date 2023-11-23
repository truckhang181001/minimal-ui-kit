import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Scrollbar from '../../../../components/Scrollbar';
import InvoiceToolbar from './InvoiceToolbar';
import Logo from '../../../../components/Logo';

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceDetails({ invoice }) {
  // const theme = useTheme();

  if (!invoice) {
    return null;
  }

  const { invoiceFrom } = invoice;

  const detailInvoice = {
    id: '74e058c4-27b0-42f1-a756-c14c5fe23e42',
    orderID: '27174323-C6ADR263TA2TGX',
    eater: {
      name: 'Huynh Truc',
      mobileNumber: '+8597961691',
    },
    address: {
      address: '69 Lý Tự Trọng, P.Bến Thành, Q.1, Hồ Chí Minh',
      keywords: 'Thư viện Khoa học Tổng hợp TP.HCM - Cổng Lý Tự Trọng',
    },
    storeId: 'd08c7e26-af3b-4c5c-8b98-f83d9c9a7a3c',
    itemInfo: {
      count: 1,
      items: [
        {
          name: 'Trà Sữa Hạt Mixed Ulangon',
          quantity: 1,
          fare: {
            currencySymbol: '₫',
            priceDisplay: '59.000',
            originalItemPriceDisplay: '49.000',
            beforeAdjustedPriceDisplay: '49.000',
          },
          comment: '',
          modifierGroups: [
            {
              modifierGroupID: 'VNMOG20230712183226014187',
              modifierGroupName: 'Đá chung hay Đá riêng',
              modifiers: [
                {
                  modifierID: 'VNMOD20230712183226036138',
                  modifierName: 'Đá riêng (nếu khoảng cách 2km trở lên)',
                  priceDisplay: '0',
                  quantity: 1,
                  revampedPriceDisplay: '0',
                  editedStatus: 0,
                },
              ],
            },
          ],
          discountInfo: [
            {
              discountName: 'MÓN ĐỈNH ƯU ĐÃI 10%',
              discountFunding: '',
              itemDiscountPriceDisplay: '4.900',
              isNewPromotion: false,
              discountType: 'percentage',
            },
          ],
          itemID: 'VNITE20230712183225016219',
          editedStatus: 0,
          weight: null,
          itemCode: 'ITEM-DG7O',
          specialItemType: '',
          soldByWeight: false,
          outOfStockInstruction: null,
          parentID: '',
          parentName: '',
          skuID: '',
        },
      ],
      merchantItems: null,
    },
    fare: {
      totalDisplay: '45.100',
    },
    times: {
      createdAt: '2023-11-19T06:46:40Z',
      deliveredAt: '2023-11-19T06:56:01Z',
      completedAt: '2023-11-19T07:18:31Z',
      expiredAt: '2023-11-19T06:51:40Z',
      acceptedAt: '2023-11-19T06:46:49Z',
      cancelledAt: null,
      readyAt: '2023-11-19T06:49:39Z',
      displayedAt: '2023-11-19T06:48:54Z',
      driverArriveRestoAt: null,
    },
    orderLevelDiscounts: [
      {
        discountType: 'order',
        discountName: 'BOSS9K',
        discountAmountDisplay: '9.000',
        discountAmountValueInMin: 9000,
        isNewPromotion: false,
      },
    ],
  };

  const { orderID, eater, address, itemInfo, fare, times } = detailInvoice;

  return (
    <>
      <InvoiceToolbar invoice={detailInvoice} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Logo />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Typography variant="h6">{orderID}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice from
            </Typography>
            <Typography variant="body2">{invoiceFrom.name}</Typography>
            <Typography variant="body2">{invoiceFrom.address}</Typography>
            <Typography variant="body2">Phone: {invoiceFrom.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice to
            </Typography>
            <Typography variant="body2">{eater.name}</Typography>
            <Typography variant="body2">{address.address}</Typography>
            <Typography variant="body2">Phone: {eater.mobileNumber}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Date create
            </Typography>
            <Typography variant="body2">{fDate(times.createdAt)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Due date
            </Typography>
            <Typography variant="body2">{fDate(times.completedAt)}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="right">Unit price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {itemInfo.items.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.discountInfo[0].discountName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="right">{row.fare.originalItemPriceDisplay}</TableCell>
                    <TableCell align="right">
                      {parseInt(row.fare.originalItemPriceDisplay, 10) * row.quantity}
                    </TableCell>
                  </TableRow>
                ))}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>Subtotal</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{fCurrency(49000)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>Discount</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography sx={{ color: 'error.main' }}>
                      {fCurrency(-itemInfo.items[0].discountInfo[0].itemDiscountPriceDisplay)}
                    </Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{fCurrency(fare.totalDisplay)}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider sx={{ mt: 4 }} />
      </Card>
    </>
  );
}
