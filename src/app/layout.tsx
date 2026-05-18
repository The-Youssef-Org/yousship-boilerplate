import { JetBrains_Mono, Nunito_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Toaster } from "react-hot-toast";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const hasSvgFavicon = existsSync(join(process.cwd(), "public", "favicon.svg"));

const selectedIcon = hasSvgFavicon
  ? { url: "/favicon.svg", type: "image/svg+xml" }
  : { url: "/favicon.ico", type: "image/x-icon" };

export const metadata = getSEOTags({
  openGraphImageRelativePath: "/og.png",
  extraTags: {
    icons: {
      icon: [selectedIcon],
      shortcut: selectedIcon.url,
      apple: selectedIcon.url,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={config.theme}
      className={`${plusJakartaSans.variable} ${nunitoSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
