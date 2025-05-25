import Menu from "@components/components/Menu";
import { Toaster } from 'sonner'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu currentPage={children} />
      <Toaster
          position="top-right"
          richColors 
          toastOptions={{
            duration: 4000,      
            classNames: {                  
              success: 'bg-green-600 text-white',
              error:   'bg-red-600   text-white',
              loading: 'bg-blue-600  text-white',
            },
          }}
        />
    </>
  );
}
