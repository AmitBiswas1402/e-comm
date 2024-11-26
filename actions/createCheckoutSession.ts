"use server";

import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    const itemsWithoutPrice = items.filter((item) => item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Missing prices for some items");
    }

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_creation: customerId ? undefined : "always",
        customer_email: !customerId ? metadata.customerEmail : undefined,
        metadata,
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${`https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
        cancel_url: `${`https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL}/basket`,
        line_items: itemsWithoutPrice.map((item) => ({
            price_data: {
                currency: "usd",
                unit_amount: Math.round(item.product.price! * 100),
            },
            quantity: item.quantity,
        })),
    })
  } catch (error) {
    console.error("Error creating checkout session", error);
    throw error;
  }
}
