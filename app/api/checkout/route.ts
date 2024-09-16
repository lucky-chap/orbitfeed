import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const { unit_amount, quantity, userId, email } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      payment_intent_data: {
        metadata: {
          userId: userId,
          email: email,
        },
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Orbitfeed Pro Plan",
            },
            unit_amount,
          },
          quantity,
        },
      ],
      metadata: {
        userId: userId,
        email: email,
      },
      mode: "payment",
      success_url: `${req.headers.get("origin")}/pro-activated?user_id=${userId}`,
      cancel_url: `${req.headers.get("origin")}/billing`,
    });

    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      throw new Error(
        `Error creating Stripe checkout session: ${error.message}`,
        { cause: error }
      );
  }
}
