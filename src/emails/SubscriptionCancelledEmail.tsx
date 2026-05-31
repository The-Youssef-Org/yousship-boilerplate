import * as React from "react";
import { Text, render } from "react-email";
import { EmailLayout } from "./EmailLayout";
import config from "@/config";

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

export const SubscriptionCancelledEmail = ({
  customerName,
  productName,
}: {
  customerName: string;
  productName?: string;
  endDate?: string;
}) => (
  <EmailLayout preview={`Your ${config.appName} subscription has ended`}>
    <Text style={h1}>Sorry to see you go{customerName ? `, ${customerName}` : ""}.</Text>
    <Text style={text}>
      Your{productName ? ` ${productName} ` : " "}subscription has now ended and your
      access has been removed. We&apos;re genuinely sorry to see you leave.
    </Text>
    <Text style={text}>
      If there was something we could have done better, we&apos;d love to know — your
      feedback helps us improve for everyone. You can always reach us at{" "}
      <a href={`mailto:${config.mail.supportEmail}`} style={{ color: "#4A93C8" }}>
        {config.mail.supportEmail}
      </a>.
    </Text>
    <Text style={text}>
      If you change your mind, you&apos;re always welcome back.
    </Text>
    <Text style={signature}>— The {config.appName} team</Text>
  </EmailLayout>
);

const h1: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "24px",
  fontWeight: "700",
  color: "#111827",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontFamily: font,
};

const text: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#374151",
  fontFamily: font,
};

const signature: React.CSSProperties = {
  margin: "0",
  fontSize: "14px",
  color: "#6b7280",
  fontFamily: font,
};

export const subscriptionCancelledEmail = (props: {
  customerName: string;
  productName?: string;
  endDate?: string;
}): Promise<string> =>
  render(<SubscriptionCancelledEmail {...props} />);

export default SubscriptionCancelledEmail;
