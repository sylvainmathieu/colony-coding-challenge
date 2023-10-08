export function convertFromWeiToEth(value: string): number {
    return Number(value) / 10 ** 18;
}

export function formatAmount(value: number): string {
    return value.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 5 })
}

export function formatEth(value: string | undefined): string {
    if (!value) return "-"
    return formatAmount(convertFromWeiToEth(value))
}