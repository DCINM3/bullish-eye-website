export const metadata = {
  title: 'News - Bullish Eyes',
  description: 'Stay updated with the latest financial news, market movements, and economic trends from Bullish Eyes.',
};

export default function NewsLayout({
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
