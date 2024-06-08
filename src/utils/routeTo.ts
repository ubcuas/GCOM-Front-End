export function roundTo(num: number, digitsAfterDecimal: number) {
    const factor = Math.pow(10, digitsAfterDecimal);
    return Math.round(num * factor) / factor;
}
