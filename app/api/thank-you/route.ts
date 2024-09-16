import { NextRequest, NextResponse } from "next/server";
import ThankYouEmail from "@/emails/thank-you";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const emailFrom = process.env.EMAIL_FROM as string;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const res = await resend.emails.send({
    // change the "from" to custom domain
    from: emailFrom,
    to: email,
    subject: "Thank You!",
    react: ThankYouEmail({}),
  });

  console.log("Email response on api route: ", res);

  return NextResponse.json({ res }, { status: 200 });
}
