import React, { Fragment, useEffect, useState } from 'react';
import { fDateTime } from '../../../../utils/formatTime';
// utils
import axios from '../../../../utils/axios';
// css
import './InvoicePrintRow.css'

export const InvoicePrintRow = React.forwardRef(({ row }, ref) => {

    const [orderDetail, setOrderDetail] = useState();

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`/api/v1/orders/${row.id}`);
            setOrderDetail(response.data)
        }
        getData()
    }, [])

    let curItem = 0

    return (
        <div ref={ref} className="grabfood-label-container" style={{ display: 'none' }}>
            {orderDetail != null && orderDetail.items.map((item, totalIndex) => (
                Array.from({ length: item.quantity }, (_, i) => {
                    curItem += 1
                    return (
                        <div>
                            <div className="grabfood-label" key={item.id}>
                                <div>
                                    <div className="grabfood-label-id">
                                        <b>{orderDetail.displayId}</b>
                                    </div>
                                    <div className="grabfood-label-header">
                                        <b>{item.name}</b>
                                    </div>
                                    <div className="grabfood-label-modifiers">
                                        {item.modifierGroups.map((modifierGroup) => (
                                            modifierGroup.modifiers.map((modifierSelected) => (
                                                <div className="grabfood-label-modifier">
                                                    + {modifierSelected.modifierName}
                                                </div>
                                            ))))}
                                    </div>
                                    <div className="grabfood-label-price-time">
                                        <b>{item.fare.priceDisplay / item.quantity}đ - {fDateTime(orderDetail.time.createdAt)}</b>
                                    </div>
                                </div>
                            </div>
                            {(curItem % 2) !== 0 && (<div className="grabfood-label-empty">
                                <b>holder</b>
                            </div>)}
                        </div>
                    )
                })
            ))}
        </div>
    );
});