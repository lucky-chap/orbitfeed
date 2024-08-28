// "use client";

// import * as React from "react";
// // import {
// //   Body,
// //   Button,
// //   Container,
// //   Head,
// //   Heading,
// //   Hr,
// //   Html,
// //   Img,
// //   Link,
// //   Preview,
// //   Section,
// //   Text,
// // } from "@react-email/components";

// import { Body } from "@react-email/body";
// import { Button } from "@react-email/button";
// import { Container } from "@react-email/container";
// import { Head } from "@react-email/head";
// import { Heading } from "@react-email/heading";
// import { Hr } from "@react-email/hr";
// import { Html } from "@react-email/html";
// import { Img } from "@react-email/img";
// import Link from "@react-email/link";
// import { Preview } from "@react-email/preview";
// import { Section } from "@react-email/section";
// import { Text } from "@react-email/text";

// interface ThankYouEmailProps {
//   headerMessage?: string;
// }

// const ThankYouEmail = ({ headerMessage }: ThankYouEmailProps) => (
//   <Html>
//     <Head />
//     <Preview>Congratulations 🎉</Preview>
//     <Body style={main}>
//       <Container style={container}>
//         <Img
//           src={`${baseUrl}/images/thank-you.png`}
//           alt="OrbitFeed"
//           className="hidden"
//           style={thankYouBanner}
//         />
//         <Heading style={heading}>You went Pro! 🎉</Heading>

//         <Text style={paragraph}>
//           I wanted to take a moment to express my sincerest gratitude for
//           upgrading to our Pro plan! Your support means the world to us, and
//           we're thrilled to have you as a valued member of our community.
//         </Text>
//         <Text style={paragraph}>
//           With the Pro plan, you'll unlock a host of exclusive features and
//           benefits designed to enhance your experience and help you achieve your
//           goals more effectively. We're confident that you'll find immense value
//           in the added functionalities and resources available to you.
//         </Text>
//         <Text style={paragraph}>
//           Once again, thank you for your support and trust in our platform.
//           We're excited to continue serving you and empowering you on your path
//           to success.
//         </Text>
//         <code style={code}>Arigatou!</code>
//         <Hr style={hr} />
//         {/* <Link href="https://quirk.lol" style={reportLink}>
//           Quirk
//         </Link> */}

//         <Section style={buttonContainer}>
//           <Button style={button} href="https://orbitfeed.lol">
//             Continue to OrbitFeed
//           </Button>
//         </Section>
//       </Container>
//     </Body>
//   </Html>
// );

// ThankYouEmail.PreviewProps = {
//   validationCode: "tt226-5398x",
// } as ThankYouEmailProps;

// export default ThankYouEmail;

// const logo = {
//   borderRadius: 21,
//   width: 42,
//   height: 42,
// };

// const thankYouBanner = {
//   borderRadius: 4,
//   width: 600,
//   height: 300,
// };

// const main = {
//   backgroundColor: "#ffffff",
//   fontFamily:
//     '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

// const container = {
//   margin: "0 auto",
//   padding: "20px 0 48px",
//   maxWidth: "560px",
// };

// const heading = {
//   fontSize: "24px",
//   letterSpacing: "-0.5px",
//   lineHeight: "1.3",
//   fontWeight: "600",
//   color: "#484848",
//   padding: "17px 0 0",
// };

// const paragraph = {
//   margin: "0 0 15px",
//   fontSize: "15px",
//   lineHeight: "1.4",
//   color: "#3c4149",
// };

// const buttonContainer = {
//   padding: "27px 0 27px",
// };

// const button = {
//   backgroundColor: "#5e6ad2",
//   borderRadius: "3px",
//   fontWeight: "600",
//   color: "#fff",
//   fontSize: "15px",
//   textDecoration: "none",
//   textAlign: "center" as const,
//   display: "block",
//   padding: "11px 23px",
// };

// const reportLink = {
//   fontSize: "14px",
//   color: "#b4becc",
// };

// const hr = {
//   borderColor: "#dfe1e4",
//   margin: "42px 0 26px",
// };

// const code = {
//   fontFamily: "monospace",
//   fontWeight: "700",
//   padding: "1px 4px",
//   backgroundColor: "#dfe1e4",
//   letterSpacing: "-0.3px",
//   fontSize: "21px",
//   borderRadius: "4px",
//   color: "#3c4149",
// };

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

interface WaitlistEmailProps {
  name: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const ThankYou: React.FC<Readonly<WaitlistEmailProps>> = ({ name }) => (
  <Html>
    <Head />
    <Preview>Thank you for joining our waitlist and for your patience</Preview>
    <Tailwind>
      <Body style={main} className="bg-white text-black">
        <Container style={container} className="max-w-xl">
          <Img
            src={`${baseUrl}/images/thank-you.png`}
            alt="OrbitFeed"
            className="w-full"
            style={thankYouBanner}
          />
          <Heading className="text-black">You went Pro! 🎉</Heading>
          <Text className="text-zinc-600">
            We at OrbitFeed would like to take a moment to express our sincerest
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
          <Section className="mt-10 max-w-52">
            <Button
              className="flex w-52 items-center justify-center rounded bg-blue-500 p-3 text-center font-medium text-white duration-100 ease-in hover:bg-blue-600"
              href="https://orbitfeed.lol"
            >
              Continue to OrbitFeed
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ThankYou;

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
