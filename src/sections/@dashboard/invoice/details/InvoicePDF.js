import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { fDate } from '../../../../utils/formatTime';
//
import styles from './InvoiceStyle';
import useLocales from '../../../../hooks/useLocales';

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoicePDF({ invoice }) {
  const { orderID, eater, address, itemInfo, fare, times } = invoice;
  const { translate } = useLocales();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_full1.jpg" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text> {orderID} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>{translate('invoiceFrom')}</Text>
            <Text style={styles.body1}>{'Bui Minh Kha'}</Text>
            <Text style={styles.body1}>{'Ho Chi Minh City'}</Text>
            <Text style={styles.body1}>{'0374996432'}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>{translate('invoiceTo')}</Text>
            <Text style={styles.body1}>{eater.name}</Text>
            <Text style={styles.body1}>{address.address}</Text>
            <Text style={styles.body1}>{eater.mobileNumber}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>{translate('dateCreate')}</Text>
            <Text style={styles.body1}>{fDate(times.createdAt)}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>{translate('dueDate')}</Text>
            <Text style={styles.body1}>{fDate(times.completedAt)}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>{translate('invoiceDetails')}</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>{translate('description')}</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>{translate('quantity')}</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>{translate('unitPrice')}</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>{translate('total')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {itemInfo?.items.map((item, index) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{item.name}</Text>
                  <Text>{item.discountInfo[0].discountName}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.quantity}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.fare.originalItemPriceDisplay}</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(item.fare.originalItemPriceDisplay.replace('.', '') * item.quantity)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>{translate('subtotal')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(49000)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>{translate('discount')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(-4900)}</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>{translate('total')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(fare.totalDisplay)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
