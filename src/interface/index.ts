export type PositionType = 'Long' | 'Short';
export interface ITgMessage {
    symbol: string;
    entry: number;
    sl: {
        percent: number;
        value: number;
    };
    tp: {
        percent: number;
        value: number;
    };
    priceWhenSignalGenerated: number;
    risk?: number;
    leverage?: number;
    positionType: PositionType;
}

export type AddMsgToStackFunc = (msg: ITgMessage) => void;
export type Nullable<T> = null | T;
