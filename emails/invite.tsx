import * as React from "react";
import { Id } from "@/convex/_generated/dataModel";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface InviteUserEmailProps {
  senderId?: Id<"users"> | string;
  teamId?: Id<"teams"> | string;
  inviteId?: Id<"invites"> | string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  inviteLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "";

const InviteUserToTeam = ({
  inviteId,
  invitedByUsername,
  invitedByEmail,
  teamName,
  inviteLink,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Orbitfeed`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              {/* <Img
                src={`${baseUrl}/images/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              /> */}
              <a
                href={`${baseUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <span className="flex items-center text-sm font-semibold text-gray-900">
                  <svg
                    viewBox="0 0 40 40"
                    aria-hidden="true"
                    className="h-6 w-6 flex-none fill-zinc-700"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"
                    ></path>
                  </svg>
                  <span className="ml-2">Orbitfeed</span>
                </span>
              </a>
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join team <strong>{teamName}</strong> on{" "}
              <strong>Orbitfeed</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello there,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{teamName}</strong> team on{" "}
              <strong>Orbitfeed</strong>.
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-indigo-600 px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you were not expecting this invitation, you can ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InviteUserToTeam.PreviewProps = {
  inviteId: "223i27870924234",
  invitedByUsername: "Huncho",
  invitedByEmail: "huncho@example.com",
  teamName: "Valkyrie",
  inviteLink: `${baseUrl}/invites/21727823932`,
  inviteFromIp: "204.13.186.218",
  inviteFromLocation: "São Paulo, Brazil",
} as InviteUserEmailProps;

export default InviteUserToTeam;
