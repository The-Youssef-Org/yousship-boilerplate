import * as React from "react";
import { Text, Button, Section, render } from "react-email";
import { EmailLayout } from "./EmailLayout";
import config from "@/config";

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

export const OrderConfirmationEmail = ({
  customerName,
  productName,
  amountTotal,
  accessUrl,
}: {
  customerName: string;
  productName: string;
  amountTotal?: string;
  accessUrl?: string;
}) => (
  <EmailLayout preview={`Payment confirmed — ${productName}`}>
    <Text style={label}>PAYMENT CONFIRMED</Text>
    <Text style={h1}>You&apos;re all set{customerName ? `, ${customerName}` : ""}.</Text>
    <Text style={text}>
      Thank you for choosing {config.appName} — we&apos;re genuinely excited to have you
      on board and we&apos;ll do our best to make it worth your while.
    </Text>
    <Text style={text}>
      Your purchase of{" "}
      <strong style={{ color: "#111827" }}>{productName}</strong> is confirmed and your access
      has been activated.
    </Text>
    <Section style={infoBox}>
      <Text style={infoLabel}>PLAN</Text>
      <Text style={infoValue}>{productName}</Text>
      {amountTotal && (
        <>
          <Text style={{ ...infoLabel, marginTop: "16px" }}>AMOUNT PAID</Text>
          <Text style={infoValue}>{amountTotal}</Text>
        </>
      )}
    </Section>
    <Button
      href={accessUrl ?? `https://${config.domainName}${config.auth.dashboardUrl}`}
      style={button}
    >
      Go to your dashboard &rarr;
    </Button>
    <Text style={muted}>
      A Stripe receipt is on its way to your inbox shortly.
    </Text>
    <Text style={signature}>— The {config.appName} team</Text>
  </EmailLayout>
);

const label: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: "11px",
  fontWeight: "700",
  color: "#4A93C8",
  letterSpacing: "0.08em",
  fontFamily: font,
};

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
  margin: "0 0 24px",
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#374151",
  fontFamily: font,
};

const button: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#d97706",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "13px 28px",
  borderRadius: "10px",
  textDecoration: "none",
  fontFamily: font,
  margin: "0 0 24px",
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
  margin: "0 0 28px",
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
  fontSize: "16px",
  fontWeight: "600",
  color: "#111827",
  fontFamily: font,
};

export const orderConfirmationEmail = (props: {
  customerName: string;
  productName: string;
  amountTotal?: string;
  accessUrl?: string;
}): Promise<string> =>
  render(<OrderConfirmationEmail {...props} />);

export default OrderConfirmationEmail;
