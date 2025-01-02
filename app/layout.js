import { Roboto } from "next/font/google";
import "./globals.css";

const fontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight:'400'
});

export const metadata = {
  title: "Mini Wallet On",
  description: "Mini Wallet On",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Mini Wallet On</title>
      </head>
      <body className={`${fontRoboto.variable} ${fontRoboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
