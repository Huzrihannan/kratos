import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Krat.OS — Design System v2 & Motion Lab',
  description: 'Interactive test bench for the Krat.OS v2 design system, component catalog, and mechanical motion engine.',
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
