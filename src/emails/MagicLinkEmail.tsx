import * as React from "react";
import { Text, Button, Section, render } from "react-email";
import { EmailLayout } from "./EmailLayout";
import config from "@/config";

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

export const MagicLinkEmail = ({ confirmationUrl }: { confirmationUrl: string }) => (
  <EmailLayout preview={`Sign in to ${config.appName}`}>
    <Text style={h1}>Here&apos;s your magic link</Text>
    <Text style={text}>
      Click the button below to sign in to {config.appName}. This link expires in{" "}
      <strong style={{ color: "#111827" }}>1 hour</strong> and can only be used once.
    </Text>
    <Button href={confirmationUrl} style={button}>
      Sign in to {config.appName} &rarr;
    </Button>
    <Section style={noteBox}>
      <Text style={noteText}>
        If you didn&apos;t request this link, you can safely ignore this email. Your account is
        not at risk.
      </Text>
    </Section>
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
  margin: "0 0 28px",
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#374151",
  fontFamily: font,
};

const button: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#111827",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "13px 28px",
  borderRadius: "10px",
  textDecoration: "none",
  fontFamily: font,
  margin: "0 0 32px",
};

const noteBox: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  padding: "16px 20px",
};

const noteText: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  lineHeight: "1.6",
  color: "#6b7280",
  fontFamily: font,
};

export const magicLinkEmail = (props: { confirmationUrl: string }): Promise<string> =>
  render(<MagicLinkEmail {...props} />);

export default MagicLinkEmail;
