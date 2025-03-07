export interface AttachAlgoOrder {
    tpTriggerPxType?: 'last' | 'index' | 'mark';
    slTriggerPxType?: 'last' | 'index' | 'mark';
    tpTriggerPx?: string;
    tpOrdPx?: string;
    slTriggerPx?: string;
    slOrdPx?: string;
    sz?: string;
    attachAlgoClOrdId?: string;
    amendPxOnTriggerType?: string;
    attachAlgoId?: string;
    tpOrdKind?: string;
    actualSz?: string;
    actualPx?: string;
    actualSide?: 'tp' | 'sl';
}

export interface LinkedAlgoOrder {
    algoId?: string;
}

export interface OkxOrder {
    instType: 'SPOT' | 'MARGIN' | 'SWAP' | 'FUTURES' | 'OPTION';
    instId: string;
    tgtCcy?: string;
    ccy?: string;
    ordId: string;
    clOrdId?: string;
    algoClOrdId?: string;
    algoId?: string;
    tag?: string;
    px: string;
    sz: string;
    notionalUsd?: string;
    ordType:
        | 'market'
        | 'limit'
        | 'post_only'
        | 'fok'
        | 'ioc'
        | 'conditional'
        | 'oco'
        | 'trigger'
        | 'move_order_stop'
        | 'iceberg'
        | 'twap';
    side: 'buy' | 'sell';
    posSide?: 'net' | 'long' | 'short';
    tdMode: 'cash' | 'cross' | 'isolated';
    accFillSz: string;
    fillNotionalUsd?: string;
    avgPx: string;
    state:
        | 'live'
        | 'partially_filled'
        | 'filled'
        | 'canceled'
        | 'pause'
        | 'partially_effective'
        | 'effective'
        | 'order_failed';
    lever?: string;
    pnl?: string;
    feeCcy?: string;
    fee?: string;
    rebateCcy?: string;
    rebate?: string;
    category?: 'normal' | 'twap' | 'adl' | 'full_liquidation' | 'partial_liquidation' | 'delivery' | 'ddh';
    uTime: string;
    cTime: string;
    source?: string;
    reduceOnly?: string;
    cancelSource?: string;
    quickMgnType?: string;
    stpId?: string;
    stpMode?: string;
    attachAlgoClOrdId?: string;
    lastPx?: string;
    isTpLimit?: string;
    slTriggerPx?: string;
    slTriggerPxType?: 'last' | 'index' | 'mark';
    tpOrdPx?: string;
    tpTriggerPx?: string;
    tpTriggerPxType?: 'last' | 'index' | 'mark';
    slOrdPx?: string;
    fillPx?: string;
    tradeId?: string;
    fillSz: string;
    fillTime?: string;
    fillPnl?: string;
    fillFee?: string;
    fillFeeCcy?: string;
    execType?: string;
    fillPxVol?: string;
    fillPxUsd?: string;
    fillMarkVol?: string;
    fillFwdPx?: string;
    fillMarkPx?: string;
    amendSource?: string;
    reqId?: string;
    amendResult?: string;
    code?: string;
    msg?: string;
    pxType?: string;
    pxUsd?: string;
    pxVol?: string;
    linkedAlgoOrd?: LinkedAlgoOrder;
    attachAlgoOrds?: AttachAlgoOrder[];
}


export interface AuthMessage {
    op: string;
    args: {
        apiKey: string;
        passphrase: string;
        timestamp: string;
        sign: string;
    }[];
}

export interface SubscriptionMessage {
    op: string;
    args: {
        channel: string;
        instType: string;
    }[];
}

export interface WebSocketResponse {
    event?: string;
    code?: string;
    arg?: {
        channel?: string;
    };
    data?: any;
}