import Menu from "@components/components/Menu";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu currentPage={children} />
    </>
      
        
  
  );
}
