export const COUPON_CODES = {
    WINTER : "WINTER",
    SUMMER : "SUMMER",
    EASTER : "EASTER",
    HOLIDAY : "HOLIDAY",
    NEW_YEAR : "NEW_YEAR",
    FALL : "FALL",
    CHRISTMAS : "CHRISTMAS",
} as const

export type CouponCode = keyof typeof COUPON_CODES