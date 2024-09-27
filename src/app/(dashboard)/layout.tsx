import Navbar from "@/src/components/NavBar";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { MenuProvider } from "@/src/context/MenuContext";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <ProtectedRoute>
        <MenuProvider>
          <div className="">
            <Navbar />
            {children}
          </div>
        </MenuProvider>
      </ProtectedRoute>
  
  );
}
