"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="">
          <script
            src="https://cdn.enable.co.il/licenses/enable-L17888rpjyz85bw0-0223-49333/init.js"
            defer
          />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
