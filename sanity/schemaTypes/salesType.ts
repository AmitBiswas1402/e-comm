import { TagIcon } from "@sanity/icons";
import { disconnect, title } from "process";
import { defineField, defineType } from "sanity";


export const salesType = defineType({
    name: "sale",
    title: "Sale",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Sale Title"
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Sale Description"
        }),
        defineField({
            name: "discountAmount",
            type: "number",
            title: "Discount Amount",
            description: "Amount off in percentage"
        }),
        defineField({
            name: "couponCode",
            type: "string",
            title: "Coupon Code",
        }),
        defineField({
            name: "validForm",
            type: "datetime",
            title: "Valid Form"
        }),
        defineField({
            name: "validUntil",
            type: "datetime",
            title: "Valid Until"
        }),
        defineField({
            name: "isActive",
            type: "boolean",
            title: "Is Active",
            description: "Toggle to act/deact the sales",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
          title: "title",
          discountAmount: "discountAmount",
          couponCode: "couponCode",
          isActive: "isActive"
        },
        prepare(selection) {
            const {title, discountAmount, couponCode, isActive} = selection
            const status = isActive? "Active" : "Inactive";
          return {
            title,
            subtitle: `${discountAmount}% off  - Code: ${couponCode} - ${status}`,
          };
        },
    },
})