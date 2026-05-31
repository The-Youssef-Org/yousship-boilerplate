import * as React from "react";
import { Html, Head, Preview, Body, Container, Section, Row, Column, Text, Link, Img } from "react-email";
import config from "@/config";

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

export const EmailLayout = ({
  preview,
  children,
}: {
  preview?: string;
  children: React.ReactNode;
}) => (
  <Html lang="en">
    <Head />
    {preview && <Preview>{preview}</Preview>}
    <Body style={body}>
      <Container style={card}>
        <Section style={brandBar}>
          <Row>
            {(config.logoUrl as string) && (
              <Column style={{ width: "32px", verticalAlign: "middle" }}>
                <Img
                  src={config.logoUrl as string}
                  width="28"
                  height="28"
                  alt={config.appName}
                  style={{ display: "block" }}
                />
              </Column>
            )}
            <Column style={{ verticalAlign: "middle", paddingLeft: (config.logoUrl as string) ? "10px" : "0" }}>
              <Text style={brandText}>{config.appName}</Text>
            </Column>
          </Row>
        </Section>

        <Section style={contentArea}>{children}</Section>

        <Section style={footerArea}>
          <Text style={footerLine}>
            {config.appName} &middot;{" "}
            <Link href={`https://${config.domainName}`} style={footerLink}>
              {config.domainName}
            </Link>
          </Text>
          <Text style={{ ...footerLine, marginTop: "4px" }}>
            Questions?{" "}
            <Link href={`mailto:${config.mail.supportEmail}`} style={footerLink}>
              {config.mail.supportEmail}
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const body: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  margin: "0",
  padding: "48px 20px",
  fontFamily: font,
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  maxWidth: "560px",
  margin: "0 auto",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
};

const brandBar: React.CSSProperties = {
  padding: "24px 40px 22px",
  borderBottom: "1px solid #f3f4f6",
};

const brandText: React.CSSProperties = {
  margin: "0",
  fontSize: "15px",
  fontWeight: "700",
  color: "#111827",
  letterSpacing: "-0.3px",
  lineHeight: "1",
  fontFamily: font,
};

const contentArea: React.CSSProperties = {
  padding: "40px 40px 32px",
};

const footerArea: React.CSSProperties = {
  borderTop: "1px solid #f3f4f6",
  padding: "20px 40px 28px",
  backgroundColor: "#fafafa",
};

const footerLine: React.CSSProperties = {
  margin: "0",
  fontSize: "12px",
  color: "#9ca3af",
  lineHeight: "1.6",
  fontFamily: font,
};

const footerLink: React.CSSProperties = {
  color: "#9ca3af",
  textDecoration: "underline",
};
