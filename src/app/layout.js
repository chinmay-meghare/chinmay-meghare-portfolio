import "../../globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/navigation/Navbar";
import FullScreenNav from "@/components/navigation/FullScreenNav";
import NavContext from "@/context/NavContext";
import CursorFollower from "@/components/common/CursorFollower";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500",],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["500"],
});

export const metadata = {
  title: "Chinmay Meghare — Frontend Developer",
  description:
    "Portfolio of Chinmay Meghare — Frontend Developer specializing in React, Next.js, and creative UI animations.",
};

export default function RootLayout({ children }) {
  const htmlClasses = [
    inter.variable,
    fraunces.variable,
    jetbrains.variable,
  ].join(" ");

  return (
    <html lang="en" className={htmlClasses}>
      <body className="antialiased">
        <CursorFollower />
        <NavContext>
          <SmoothScrollProvider>
            <Navbar />
            <FullScreenNav />
            {children}
          </SmoothScrollProvider>
        </NavContext>
      </body>
    </html>
  );
}
