import Menu from "@components/components/Menu";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Menu currentPage={children} />
      </body>
    </html>
  );
}
