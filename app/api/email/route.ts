// demo api route for testing emails

"use server";

import { NextRequest, NextResponse } from "next/server";
import ThankYouEmail from "@/emails/thank-you";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  // const userEmail = (
  //     await clerkClient.users.getUser(
  //       event.data.object.metadata?.userId as string,
  //     )
  //   ).emailAddresses[0].emailAddress;
  const res = await resend.emails.send({
    // change the "from" to custom domain
    from: "Quirk <noreply@quirk.lol>",
    to: "hunchodotdev@gmail.com",
    subject: "Thank You!",
    react: ThankYouEmail({ name: "Bam" }),
  });

  return NextResponse.json({ res }, { status: 200 });
}
