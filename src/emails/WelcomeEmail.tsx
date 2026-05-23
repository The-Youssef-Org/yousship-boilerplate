import * as React from "react";
import { Text, render } from "react-email";
import { EmailLayout } from "./EmailLayout";
import config from "@/config";

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

export const WelcomeEmail = ({ name }: { name?: string }) => {
  const greeting = name ? `Welcome, ${name}!` : `Welcome to ${config.appName}!`;

  return (
    <EmailLayout preview={`Welcome to ${config.appName} — we're glad you're here.`}>
      <Text style={label}>WELCOME</Text>
      <Text style={h1}>{greeting}</Text>
      <Text style={text}>
        We&apos;re really glad you joined {config.appName}. Your account is ready — go ahead
        and take a look around.
      </Text>
      <Text style={text}>
        If you run into anything or have questions, our support is here to help.
      </Text>
      <Text style={signature}>— The {config.appName} team</Text>
    </EmailLayout>
  );
};

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
  margin: "0 0 16px",
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#374151",
  fontFamily: font,
};

const signature: React.CSSProperties = {
  margin: "24px 0 0",
  fontSize: "14px",
  color: "#6b7280",
  fontFamily: font,
};

export const welcomeEmail = (props: { name?: string }): Promise<string> =>
  render(<WelcomeEmail {...props} />);

export default WelcomeEmail;
