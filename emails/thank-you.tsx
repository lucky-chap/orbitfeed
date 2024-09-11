"use client";

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ThankYouEmailProps {}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

const ThankYouEmail: React.FC<Readonly<ThankYouEmailProps>> = ({}) => (
  <Html>
    <Head />
    <Preview>Thank you for joining our waitlist and for your patience</Preview>
    <Tailwind>
      <Body style={main} className="bg-white text-black">
        <Container style={container} className="max-w-xl">
          <Img
            src={`${baseUrl}/images/thank-you.png`}
            alt="Orbitfeed"
            className="w-full"
            style={thankYouBanner}
          />
          <Heading className="text-black">You went Pro! 🎉</Heading>
          <Text className="text-zinc-600">
            We at Orbitfeed would like to take a moment to express our sincerest
            gratitude for upgrading to our Pro plan! Your support means the
            world to us, and we're thrilled to have you as a valued member of
            our community.
          </Text>
          <Text className="text-zinc-600">
            With the Pro plan, you'll unlock a host of exclusive features and
            benefits designed to enhance your experience and help you achieve
            your goals more effectively. We're confident that you'll find
            immense value in the added functionalities and resources available
            to you.
          </Text>
          <Text className="text-zinc-600">
            Once again, thank you for your support and trust in our platform.
            We're excited to continue serving you and empowering you on your
            path to success.
          </Text>
          <Container className="mx-0 mt-10 w-full max-w-xl">
            <Button
              className="rounded bg-indigo-600 px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
              href={baseUrl}
            >
              Continue to Orbitfeed
            </Button>
          </Container>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ThankYouEmail;

const main = {
  margin: "0 auto",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "auto",
  padding: "96px 20px 64px",
};

const thankYouBanner = {
  borderRadius: 4,
  width: 600,
  height: 300,
};
