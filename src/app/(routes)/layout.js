import { Inter } from "next/font/google";
import "@/app/globals.css";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Veporting",
  description: "Web application for reporting vulnerability assessment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F1F7FF]`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
