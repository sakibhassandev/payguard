import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface PaymentStatusChangedProps {
  name: string;
  status: string;
}

export default function PaymentStatusChanged({
  name,
  status,
}: PaymentStatusChangedProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>PayGuard | Status Changed</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your Payment Status Has Been Changed</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hey {name},</Heading>
          <Text>
            Your payment status has been changed it is now {status}. Please
            check your account for more details.
          </Text>
        </Row>
        <Row>
          <Text>
            If you have any questions, simply reply to this email. I’m here to
            help.
          </Text>
        </Row>
        <Row>
          <Text>Best regards, PayGuard Team</Text>
        </Row>
      </Section>
    </Html>
  );
}
