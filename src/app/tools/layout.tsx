export const metadata = {
  title: 'Financial Tools - Bullish Eyes',
  description: 'Access free financial calculators and tools to plan your investments and track your wealth.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
