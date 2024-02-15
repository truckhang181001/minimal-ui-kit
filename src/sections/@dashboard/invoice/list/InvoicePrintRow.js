import React, { useEffect, useState } from 'react';
import { fDateTime } from '../../../../utils/formatTime';
import './InvoicePrintRow.css'

export const InvoicePrintRow = React.forwardRef(({ row }, ref) => {

    const [orderDetail, setOrderDetail] = useState();

    useEffect(() => {
        fetch(`collector:8080/api/v1/orders/${row.id}`)
            .then(res => res.json())
            .then(data => {
                setOrderDetail(data)
            })
    }, [])

    return (
        <div ref={ref} className="grabfood-label-container" style={{ display: 'none' }}>
            {orderDetail != null && orderDetail.items.map((item) => (
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
                            <b>{item.fare.priceDisplay}đ - {fDateTime(orderDetail.time.createdAt)}</b>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});