import * as React from "react";
import { Text, Section, render } from "react-email";
import { EmailLayout } from "./EmailLayout";
import config from "@/config";

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

export const SubscriptionCancellationScheduledEmail = ({
  customerName,
  productName,
  endDate,
}: {
  customerName: string;
  productName?: string;
  endDate?: string;
}) => (
  <EmailLayout preview={`Your ${config.appName} subscription will cancel at period end`}>
    <Text style={h1}>We&apos;ve received your cancellation.</Text>
    <Text style={text}>
      Hi {customerName}, your{productName ? ` ${productName} ` : " "}subscription is set to cancel
      at the end of the current billing period. You won&apos;t be charged again.
    </Text>
    <Section style={infoBox}>
      <Text style={infoLabel}>ACCESS ACTIVE UNTIL</Text>
      <Text style={infoValue}>{endDate ?? "end of current billing period"}</Text>
    </Section>
    <Text style={text}>
      You still have full access until then — nothing changes before that date.
    </Text>
    <Text style={muted}>
      Changed your mind? You can reactivate anytime from your billing settings before the period
      ends.
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

const muted: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#6b7280",
  fontFamily: font,
};

const signature: React.CSSProperties = {
  margin: "0",
  fontSize: "14px",
  color: "#6b7280",
  fontFamily: font,
};

const infoBox: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "0 0 20px",
};

const infoLabel: React.CSSProperties = {
  margin: "0 0 4px",
  fontSize: "11px",
  fontWeight: "700",
  color: "#a1a1aa",
  letterSpacing: "0.08em",
  fontFamily: font,
};

const infoValue: React.CSSProperties = {
  margin: "0",
  fontSize: "18px",
  fontWeight: "700",
  color: "#111827",
  fontFamily: font,
};

export const subscriptionCancellationScheduledEmail = (props: {
  customerName: string;
  productName?: string;
  endDate?: string;
}): Promise<string> =>
  render(<SubscriptionCancellationScheduledEmail {...props} />);

export default SubscriptionCancellationScheduledEmail;
