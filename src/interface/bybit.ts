export interface BybitOrderData {
    category: 'linear' | 'inverse';
    symbol: string;
    orderId: string;
    orderLinkId: string;
    blockTradeId: string;
    side: 'Buy' | 'Sell';
    positionIdx: number;
    orderStatus: 'New' | 'PartiallyFilled' | 'Filled' | 'Cancelled' | 'Rejected' | 'PendingCancel' | 'Untriggered';
    cancelType: string;
    rejectReason: string;
    timeInForce: 'GTC' | 'FOK' | 'IOC';
    isLeverage: string;
    price: string;
    qty: string;
    avgPrice: string;
    leavesQty: string;
    leavesValue: string;
    cumExecQty: string;
    cumExecValue: string;
    cumExecFee: string;
    orderType: 'Limit' | 'Market' | 'StopLimit' | 'StopMarket';
    stopOrderType: string;
    orderIv: string;
    triggerPrice: string;
    takeProfit: string;
    stopLoss: string;
    triggerBy: string;
    tpTriggerBy: string;
    slTriggerBy: string;
    triggerDirection: number;
    placeType: string;
    lastPriceOnCreated: string;
    closeOnTrigger: boolean;
    reduceOnly: boolean;
    smpGroup: number;
    smpType: string;
    smpOrderId: string;
    slLimitPrice: string;
    tpLimitPrice: string;
    tpslMode: 'Full' | 'Partial';
    createType: string;
    marketUnit: string;
    createdTime: string;
    updatedTime: string;
    feeCurrency: string;
    closedPnl: string;
    slippageTolerance: string;
    slippageToleranceType: string;
}

export interface BybitOrderMessage {
    topic: 'order';
    id: string;
    creationTime: number;
    data: BybitOrderData[];
    wsKey: string;
    isWSAPIResponse?: boolean;
}
