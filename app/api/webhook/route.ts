import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ThankYouEmail from "@/emails/thank-you";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { Resend } from "resend";
import Stripe from "stripe";

// import { renderSync } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  {
    apiVersion: "2024-06-20",
  }
);

type METADATA = {
  userId: Id<"users">;
  email: string;
};

export async function POST(request: Request) {
  const user = await fetchQuery(api.user.viewer);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  const text = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (request === null)
    throw new Error(`Missing userId or request`, { cause: { request } });

  if (sig === null) throw new Error("stripeSignature is null");

  let event;
  try {
    event = stripe.webhooks.constructEvent(text, sig, webhookSecret);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
  }

  if (event === undefined) throw new Error(`event is undefined`);

  switch (event.type) {
    case "checkout.session.completed":
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Session completed!",
      });
    case "payment_intent.succeeded":
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Payment intent succeeded!",
      });
    case "charge.succeeded":
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Charge succeeded!",
      });
    case "charge.updated":
      const session = event.data.object;
      const metadata = session.metadata as METADATA;
      let userUpdated = false;
      let emailSent = false;
      console.log(`Payment successful for session ID: ${session.id}`);

      console.log("User id: ", metadata.userId);

      try {
        if (metadata === null) return;

        const update = await fetchMutation(api.proUsers.upgradeUserToPro, {
          userId: metadata.userId,
          email: metadata.email,
        });

        if (update.success) {
          userUpdated = true;
          // send email to user
          // TODO: use an action to do this
          const res = await resend.emails.send({
            // change the "from" to custom domain
            from: "Quirk <noreply@quirk.lol>",
            to: metadata.email,
            subject: "Thank You!",
            react: ThankYouEmail({ name: "Bam" }),
          });
          if (res.data?.id !== undefined) {
            emailSent = true;
          } else {
            emailSent = false;
          }
        } else {
          userUpdated = false;
        }
      } catch (error) {
        console.error("Error from webhook: ", error);
      }

      return NextResponse.json({
        status: userUpdated ? 200 : 500,
        success: userUpdated,
        message: userUpdated
          ? "User has been upgraded to Pro"
          : "User could not be upgraded to Pro",
        email: {
          status: emailSent ? 200 : 500,
          success: emailSent,
          message: emailSent
            ? "Email sent to user"
            : "Email could not be sent to user",
        },
      });

    default:
      console.warn(`Unhandled event type: ${event.type}`);
      return NextResponse.json({
        status: 500,
        success: false,
        message: `Unhandled event type: ${event.type}`,
      });
  }

  return NextResponse.json({
    status: 200,
    message: "success",
    userId: user?._id,
  });
}
