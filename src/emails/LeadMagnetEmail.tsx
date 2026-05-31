import * as React from "react";
import { Text, Section, Row, Column, Hr, Button, render } from "react-email";
import { EmailLayout } from "./EmailLayout";
import config from "@/config";

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

export const LeadMagnetEmail = ({
  heading = "You're officially in.",
  subheading = `Great to have you. Here's exactly what being part of the ${config.appName} community means for you.`,
  bulletPoints = [
    "The inside track on what we're building and where we're headed",
    "Practical tips and guides delivered straight to your inbox",
    "Honest updates from the team — no fluff, no spam",
    "A direct line to us — we actually read every reply",
  ],
  resourceUrl,
}: {
  heading?: string;
  subheading?: string;
  bulletPoints?: string[];
  resourceUrl?: string;
}) => (
  <EmailLayout preview={`${heading} — ${config.appName}`}>
    <Text style={h1}>{heading}</Text>
    <Text style={text}>{subheading}</Text>

    {bulletPoints.length > 0 && (
      <Section style={listBox}>
        {bulletPoints.map((point, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Hr style={{ margin: "0", borderColor: "#f4f4f5" }} />}
            <Row>
              <Column style={{ width: "44px", verticalAlign: "top", paddingTop: "14px", paddingLeft: "16px" }}>
                <Text style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#4A93C8", fontFamily: font, lineHeight: "1.6" }}>
                  ✓
                </Text>
              </Column>
              <Column style={{ paddingTop: "12px", paddingBottom: "12px", paddingRight: "20px" }}>
                <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#374151", fontFamily: font }}>
                  {point}
                </Text>
              </Column>
            </Row>
          </React.Fragment>
        ))}
      </Section>
    )}

    {resourceUrl && (
      <Button href={resourceUrl} style={button}>
        Access your resource &rarr;
      </Button>
    )}

    <Text style={signature}>— The {config.appName} team</Text>
  </EmailLayout>
);

const h1: React.CSSProperties = {
  margin: "0 0 16px",
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

const muted: React.CSSProperties = {
  margin: "24px 0 8px",
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

const listBox: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  margin: "0 0 28px",
  width: "100%",
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
  margin: "0 0 28px",
};

export const leadMagnetEmail = (props: {
  heading?: string;
  subheading?: string;
  bulletPoints?: string[];
  resourceUrl?: string;
}): Promise<string> =>
  render(<LeadMagnetEmail {...props} />);

export default LeadMagnetEmail;
