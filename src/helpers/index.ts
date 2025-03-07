export const calculatePercent = (target: number, base: number) =>
    Number(((Math.abs(target - base) / base) * 100).toFixed(1));
