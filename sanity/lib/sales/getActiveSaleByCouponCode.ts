import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { title } from "process";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
        *[
            _type == "sale"
            && isActive == true | 
            && couponCode == $couponCode
        ] | order(validForm desc) [0]
        `)
    
}