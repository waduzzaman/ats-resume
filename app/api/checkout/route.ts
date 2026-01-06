import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ✅ REQUIRED for Stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ATS-Optimized Resume Download",
              description: "One-time resume optimization & download",
            },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/analyze`,
    });


    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error); // 👈 ADD THIS
    return NextResponse.json(
      { error: "Stripe session failed" },
      { status: 500 }
    );
  }
}
