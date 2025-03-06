export interface IBybitPositionData {
    positionIdx: number;
    tradeMode: number;
    riskId: number;
    riskLimitValue: string;
    symbol: string;
    // If the side value is an empty string (''), it means the position is not completed
    // (it has no entry price, size, or other relevant details).
    side: 'Buy' | 'Sell' | ''
    size: string;
    entryPrice: string;
    sessionAvgPrice: string;
    leverage: string;
    positionValue: string;
    positionBalance: string;
    markPrice: string;
    positionIM: string;
    positionMM: string;
    takeProfit: string;
    stopLoss: string;
    trailingStop: string;
    unrealisedPnl: string;
    cumRealisedPnl: string;
    curRealisedPnl: string;
    createdTime: string;
    updatedTime: string;
    tpslMode: 'Full' | 'Partial';
    liqPrice: string;
    bustPrice: string;
    category: 'linear' | 'inverse';
    positionStatus: string;
    adlRankIndicator: number;
    autoAddMargin: number;
    leverageSysUpdatedTime: string;
    mmrSysUpdatedTime: string;
    seq: number;
    isReduceOnly: boolean;
}

export interface IBybitPositionMessage {
    id: string;
    topic: 'position';
    creationTime: number;
    data: IBybitPositionData[];
    wsKey: string;
    isWSAPIResponse?: boolean;
}

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


const a1: BybitOrderMessage = {
    topic: 'order',
    id: '142408493_BTCUSDT_343821878532',
    creationTime: 1741221269268,
    data: [
        {
            category: 'linear',
            symbol: 'BTCUSDT',
            orderId: '9f3671fd-16b2-4059-87f6-c3cf1e645c1b',
            orderLinkId: '',
            blockTradeId: '',
            side: 'Sell',
            positionIdx: 0,
            orderStatus: 'Deactivated',
            cancelType: 'CancelByTpSlTsClear',
            rejectReason: 'EC_NoError',
            timeInForce: 'IOC',
            isLeverage: '',
            price: '0',
            qty: '0.001',
            avgPrice: '',
            leavesQty: '0',
            leavesValue: '0',
            cumExecQty: '0',
            cumExecValue: '0',
            cumExecFee: '0',
            orderType: 'Market',
            stopOrderType: 'StopLoss',
            orderIv: '',
            triggerPrice: '74713.7',
            takeProfit: '',
            stopLoss: '',
            triggerBy: 'LastPrice',
            tpTriggerBy: '',
            slTriggerBy: '',
            triggerDirection: 2,
            placeType: '',
            lastPriceOnCreated: '90180.4',
            closeOnTrigger: true,
            reduceOnly: true,
            smpGroup: 0,
            smpType: 'None',
            smpOrderId: '',
            slLimitPrice: '0',
            tpLimitPrice: '0',
            tpslMode: 'Full',
            createType: 'CreateByStopLoss',
            marketUnit: '',
            createdTime: '1741221129911',
            updatedTime: '1741221269267',
            feeCurrency: '',
            closedPnl: '0',
            slippageTolerance: '0',
            slippageToleranceType: 'UNKNOWN'
        },
        {
            category: 'linear',
            symbol: 'BTCUSDT',
            orderId: '4ccc191d-3f1c-47ad-a05e-1d5099aa5175',
            orderLinkId: '',
            blockTradeId: '',
            side: 'Sell',
            positionIdx: 0,
            orderStatus: 'Filled',
            cancelType: 'UNKNOWN',
            rejectReason: 'EC_NoError',
            timeInForce: 'IOC',
            isLeverage: '',
            price: '89337.5',
            qty: '0.001',
            avgPrice: '90242.9',
            leavesQty: '0',
            leavesValue: '0',
            cumExecQty: '0.001',
            cumExecValue: '90.2429',
            cumExecFee: '0.0902429',
            orderType: 'Market',
            stopOrderType: 'TakeProfit',
            orderIv: '',
            triggerPrice: '90240.3',
            takeProfit: '',
            stopLoss: '',
            triggerBy: 'LastPrice',
            tpTriggerBy: '',
            slTriggerBy: '',
            triggerDirection: 1,
            placeType: '',
            lastPriceOnCreated: '90239.8',
            closeOnTrigger: true,
            reduceOnly: true,
            smpGroup: 0,
            smpType: 'None',
            smpOrderId: '',
            slLimitPrice: '0',
            tpLimitPrice: '0',
            tpslMode: 'Full',
            createType: 'CreateByTakeProfit',
            marketUnit: '',
            createdTime: '1741221129911',
            updatedTime: '1741221269267',
            feeCurrency: '',
            closedPnl: '-0.1180234',
            slippageTolerance: '0',
            slippageToleranceType: 'UNKNOWN'
        }
    ],
    wsKey: 'v5Private',
    isWSAPIResponse: undefined
}

//Открыл шорт лимиткой
const qq: BybitOrderMessage = {
    topic: 'order',
    id: '142408493_BTCUSDT_343830470473',
    creationTime: 1741222325636,
    data: [
        {
            category: 'linear',
            symbol: 'BTCUSDT',
            orderId: '72bd9f6c-c44b-47de-b09d-a530032c12ae',
            orderLinkId: '',
            blockTradeId: '',
            side: 'Sell',
            positionIdx: 0,
            orderStatus: 'New',
            cancelType: 'UNKNOWN',
            rejectReason: 'EC_NoError',
            timeInForce: 'GTC',
            isLeverage: '',
            price: '90100.9',
            qty: '0.001',
            avgPrice: '',
            leavesQty: '0.001',
            leavesValue: '90.1009',
            cumExecQty: '0',
            cumExecValue: '0',
            cumExecFee: '0',
            orderType: 'Limit',
            stopOrderType: '',
            orderIv: '',
            triggerPrice: '',
            takeProfit: '90040.9',
            stopLoss: '101213.4',
            triggerBy: '',
            tpTriggerBy: 'LastPrice',
            slTriggerBy: 'LastPrice',
            triggerDirection: 0,
            placeType: '',
            lastPriceOnCreated: '90022',
            closeOnTrigger: false,
            reduceOnly: false,
            smpGroup: 0,
            smpType: 'None',
            smpOrderId: '',
            slLimitPrice: '0',
            tpLimitPrice: '0',
            tpslMode: 'Full',
            createType: 'CreateByUser',
            marketUnit: '',
            createdTime: '1741222325631',
            updatedTime: '1741222325634',
            feeCurrency: '',
            closedPnl: '0',
            slippageTolerance: '0',
            slippageToleranceType: 'UNKNOWN'
        }
    ],
    wsKey: 'v5Private',
    isWSAPIResponse: undefined
}


//Шорт сработал
const qq: BybitOrderMessage = {
    topic: 'order',
    id: '142408493_BTCUSDT_344147803441',
    creationTime: 1741255383666,
    data: [
        {
            category: 'linear',
            symbol: 'BTCUSDT',
            orderId: '8e5ca15f-4bc3-49cf-9c2a-ca7608ff5096',
            orderLinkId: '',
            blockTradeId: '',
            side: 'Sell',
            positionIdx: 0,
            orderStatus: 'New',
            cancelType: 'UNKNOWN',
            rejectReason: 'EC_NoError',
            timeInForce: 'GTC',
            isLeverage: '',
            price: '100000',
            qty: '0.001',
            avgPrice: '',
            leavesQty: '0.001',
            leavesValue: '100',
            cumExecQty: '0',
            cumExecValue: '0',
            cumExecFee: '0',
            orderType: 'Limit',
            stopOrderType: '',
            orderIv: '',
            triggerPrice: '',
            takeProfit: '',
            stopLoss: '',
            triggerBy: '',
            tpTriggerBy: '',
            slTriggerBy: '',
            triggerDirection: 0,
            placeType: '',
            lastPriceOnCreated: '90665.9',
            closeOnTrigger: false,
            reduceOnly: false,
            smpGroup: 0,
            smpType: 'None',
            smpOrderId: '',
            slLimitPrice: '0',
            tpLimitPrice: '0',
            tpslMode: 'Full',
            createType: 'CreateByUser',
            marketUnit: '',
            createdTime: '1741255383660',
            updatedTime: '1741255383664',
            feeCurrency: '',
            closedPnl: '0',
            slippageTolerance: '0',
            slippageToleranceType: 'UNKNOWN'
        }
    ],
    wsKey: 'v5Private',
    isWSAPIResponse: undefined
}


/*
{
    topic: 'order',
        id: '142408493_BTCUSDT_343830941834',
    creationTime: 1741222398066,
    data: [
    {
        category: 'linear',
        symbol: 'BTCUSDT',
        orderId: 'f49dcaab-7d43-415a-96f3-4f59cbf7b16e',
        orderLinkId: '',
        blockTradeId: '',
        side: 'Buy',
        positionIdx: 0,
        orderStatus: 'Untriggered',
        cancelType: 'UNKNOWN',
        rejectReason: 'EC_NoError',
        timeInForce: 'IOC',
        isLeverage: '',
        price: '0',
        qty: '0.001',
        avgPrice: '',
        leavesQty: '0.001',
        leavesValue: '0',
        cumExecQty: '0',
        cumExecValue: '0',
        cumExecFee: '0',
        orderType: 'Market',
        stopOrderType: 'StopLoss',
        orderIv: '',
        triggerPrice: '101213.4',
        takeProfit: '',
        stopLoss: '',
        triggerBy: 'LastPrice',
        tpTriggerBy: '',
        slTriggerBy: '',
        triggerDirection: 1,
        placeType: '',
        lastPriceOnCreated: '90100',
        closeOnTrigger: true,
        reduceOnly: true,
        smpGroup: 0,
        smpType: 'None',
        smpOrderId: '',
        slLimitPrice: '0',
        tpLimitPrice: '0',
        tpslMode: 'Full',
        createType: 'CreateByStopLoss',
        marketUnit: '',
        createdTime: '1741222398064',
        updatedTime: '1741222398064',
        feeCurrency: '',
        closedPnl: '0',
        slippageTolerance: '0',
        slippageToleranceType: 'UNKNOWN'
    },
    {
        category: 'linear',
        symbol: 'BTCUSDT',
        orderId: '72bd9f6c-c44b-47de-b09d-a530032c12ae',
        orderLinkId: '',
        blockTradeId: '',
        side: 'Sell',
        positionIdx: 0,
        orderStatus: 'Filled',
        cancelType: 'UNKNOWN',
        rejectReason: 'EC_NoError',
        timeInForce: 'GTC',
        isLeverage: '',
        price: '90100.9',
        qty: '0.001',
        avgPrice: '90100.9',
        leavesQty: '0',
        leavesValue: '0',
        cumExecQty: '0.001',
        cumExecValue: '90.1009',
        cumExecFee: '0.03243633',
        orderType: 'Limit',
        stopOrderType: '',
        orderIv: '',
        triggerPrice: '',
        takeProfit: '90040.9',
        stopLoss: '101213.4',
        triggerBy: '',
        tpTriggerBy: 'LastPrice',
        slTriggerBy: 'LastPrice',
        triggerDirection: 0,
        placeType: '',
        lastPriceOnCreated: '90022',
        closeOnTrigger: false,
        reduceOnly: false,
        smpGroup: 0,
        smpType: 'None',
        smpOrderId: '',
        slLimitPrice: '0',
        tpLimitPrice: '0',
        tpslMode: 'Full',
        createType: 'CreateByUser',
        marketUnit: '',
        createdTime: '1741222325631',
        updatedTime: '1741222398064',
        feeCurrency: '',
        closedPnl: '0',
        slippageTolerance: '0',
        slippageToleranceType: 'UNKNOWN'
    },
    {
        category: 'linear',
        symbol: 'BTCUSDT',
        orderId: '29140d1b-3ee7-4670-ae2c-7ef05cf3d10f',
        orderLinkId: '',
        blockTradeId: '',
        side: 'Buy',
        positionIdx: 0,
        orderStatus: 'Untriggered',
        cancelType: 'UNKNOWN',
        rejectReason: 'EC_NoError',
        timeInForce: 'IOC',
        isLeverage: '',
        price: '0',
        qty: '0.001',
        avgPrice: '',
        leavesQty: '0.001',
        leavesValue: '0',
        cumExecQty: '0',
        cumExecValue: '0',
        cumExecFee: '0',
        orderType: 'Market',
        stopOrderType: 'TakeProfit',
        orderIv: '',
        triggerPrice: '90040.9',
        takeProfit: '',
        stopLoss: '',
        triggerBy: 'LastPrice',
        tpTriggerBy: '',
        slTriggerBy: '',
        triggerDirection: 2,
        placeType: '',
        lastPriceOnCreated: '90100',
        closeOnTrigger: true,
        reduceOnly: true,
        smpGroup: 0,
        smpType: 'None',
        smpOrderId: '',
        slLimitPrice: '0',
        tpLimitPrice: '0',
        tpslMode: 'Full',
        createType: 'CreateByTakeProfit',
        marketUnit: '',
        createdTime: '1741222398064',
        updatedTime: '1741222398064',
        feeCurrency: '',
        closedPnl: '0',
        slippageTolerance: '0',
        slippageToleranceType: 'UNKNOWN'
    }
],
    wsKey: 'v5Private',
    isWSAPIResponse: undefined
}
{
    topic: 'order',
        id: 'ts:29140d1b-3ee7-4670-ae2c-7ef05cf3d10f,1@900382000,falling,0',
    creationTime: 1741222464155,
    data: [
    {
        category: 'linear',
        symbol: 'BTCUSDT',
        orderId: '29140d1b-3ee7-4670-ae2c-7ef05cf3d10f',
        orderLinkId: '',
        blockTradeId: '',
        side: 'Buy',
        positionIdx: 0,
        orderStatus: 'Triggered',
        cancelType: 'UNKNOWN',
        rejectReason: 'EC_NoError',
        timeInForce: 'IOC',
        isLeverage: '',
        price: '0',
        qty: '0.001',
        avgPrice: '',
        leavesQty: '0.001',
        leavesValue: '0',
        cumExecQty: '0',
        cumExecValue: '0',
        cumExecFee: '0',
        orderType: 'Market',
        stopOrderType: 'TakeProfit',
        orderIv: '',
        triggerPrice: '90040.9',
        takeProfit: '',
        stopLoss: '',
        triggerBy: 'LastPrice',
        tpTriggerBy: '',
        slTriggerBy: '',
        triggerDirection: 2,
        placeType: '',
        lastPriceOnCreated: '90048.8',
        closeOnTrigger: true,
        reduceOnly: true,
        smpGroup: 0,
        smpType: 'None',
        smpOrderId: '',
        slLimitPrice: '0',
        tpLimitPrice: '0',
        tpslMode: 'Full',
        createType: 'CreateByTakeProfit',
        marketUnit: '',
        createdTime: '1741222398064',
        updatedTime: '1741222464153',
        feeCurrency: '',
        closedPnl: '0',
        slippageTolerance: '0',
        slippageToleranceType: 'UNKNOWN'
    }
],
    wsKey: 'v5Private',
    isWSAPIResponse: undefined
}
{
    topic: 'order',
        id: '142408493_BTCUSDT_343831506078',
    creationTime: 1741222464159,
    data: [
    {
        category: 'linear',
        symbol: 'BTCUSDT',
        orderId: 'f49dcaab-7d43-415a-96f3-4f59cbf7b16e',
        orderLinkId: '',
        blockTradeId: '',
        side: 'Buy',
        positionIdx: 0,
        orderStatus: 'Deactivated',
        cancelType: 'CancelByTpSlTsClear',
        rejectReason: 'EC_NoError',
        timeInForce: 'IOC',
        isLeverage: '',
        price: '0',
        qty: '0.001',
        avgPrice: '',
        leavesQty: '0',
        leavesValue: '0',
        cumExecQty: '0',
        cumExecValue: '0',
        cumExecFee: '0',
        orderType: 'Market',
        stopOrderType: 'StopLoss',
        orderIv: '',
        triggerPrice: '101213.4',
        takeProfit: '',
        stopLoss: '',
        triggerBy: 'LastPrice',
        tpTriggerBy: '',
        slTriggerBy: '',
        triggerDirection: 1,
        placeType: '',
        lastPriceOnCreated: '90100',
        closeOnTrigger: true,
        reduceOnly: true,
        smpGroup: 0,
        smpType: 'None',
        smpOrderId: '',
        slLimitPrice: '0',
        tpLimitPrice: '0',
        tpslMode: 'Full',
        createType: 'CreateByStopLoss',
        marketUnit: '',
        createdTime: '1741222398064',
        updatedTime: '1741222464157',
        feeCurrency: '',
        closedPnl: '0',
        slippageTolerance: '0',
        slippageToleranceType: 'UNKNOWN'
    },
    {
        category: 'linear',
        symbol: 'BTCUSDT',
        orderId: '29140d1b-3ee7-4670-ae2c-7ef05cf3d10f',
        orderLinkId: '',
        blockTradeId: '',
        side: 'Buy',
        positionIdx: 0,
        orderStatus: 'Filled',
        cancelType: 'UNKNOWN',
        rejectReason: 'EC_NoError',
        timeInForce: 'IOC',
        isLeverage: '',
        price: '90950.5',
        qty: '0.001',
        avgPrice: '90038.3',
        leavesQty: '0',
        leavesValue: '0',
        cumExecQty: '0.001',
        cumExecValue: '90.0383',
        cumExecFee: '0.0900383',
        orderType: 'Market',
        stopOrderType: 'TakeProfit',
        orderIv: '',
        triggerPrice: '90040.9',
        takeProfit: '',
        stopLoss: '',
        triggerBy: 'LastPrice',
        tpTriggerBy: '',
        slTriggerBy: '',
        triggerDirection: 2,
        placeType: '',
        lastPriceOnCreated: '90048.8',
        closeOnTrigger: true,
        reduceOnly: true,
        smpGroup: 0,
        smpType: 'None',
        smpOrderId: '',
        slLimitPrice: '0',
        tpLimitPrice: '0',
        tpslMode: 'Full',
        createType: 'CreateByTakeProfit',
        marketUnit: '',
        createdTime: '1741222398064',
        updatedTime: '1741222464157',
        feeCurrency: '',
        closedPnl: '-0.05987463',
        slippageTolerance: '0',
        slippageToleranceType: 'UNKNOWN'
    }
],
    wsKey: 'v5Private',
    isWSAPIResponse: undefined
}
*/
