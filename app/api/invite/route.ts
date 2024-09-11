import { NextRequest, NextResponse } from "next/server";
import InviteUserToTeam from "@/emails/invite";
import ThankYouEmail from "@/emails/thank-you";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const {
    inviteId,
    recipientEmail,
    senderId,
    senderName,
    senderEmail,
    teamId,
    teamName,
  } = await req.json();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL as string;
  const inviteLink = `${appUrl}/invites/${inviteId}?senderId=${senderId}&teamId=${teamId}`;

  const res = await resend.emails.send({
    // todo: change the "from" to custom domain
    from: "Orbitfeed <noreply@quirk.lol>",
    to: recipientEmail,
    subject: "Team Invite",
    react: InviteUserToTeam({
      inviteLink,
      invitedByEmail: senderEmail,
      invitedByUsername: senderName,
      teamName,
    }),
    text: "Hello world!",
  });

  console.log("Result from resend: ", res);

  if (res.error == null) {
    return NextResponse.json({ res: res }, { status: 200 });
  } else {
    return NextResponse.json(
      { res: res, message: "Server could not send email on /api/invite" },
      { status: 500 }
    );
  }
}
