import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System Preview | Krat.OS Software Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
