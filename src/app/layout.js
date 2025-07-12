import { Noto_Sans } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata = {
    title: "HEX Guessr",
    description: "HEX Guessr",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ja">
            <Head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            </Head>
            <body className={`${notoSans.variable} antialiased`}>{children}</body>
        </html>
    );
}
