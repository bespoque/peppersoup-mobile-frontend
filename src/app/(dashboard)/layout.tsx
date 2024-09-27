import Navbar from "@/src/components/NavBar";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { AddonsProvider } from "@/src/context/AddonsContext";
import { MenuProvider } from "@/src/context/MenuContext";
import { PortionSizesProvider } from "@/src/context/PortionSizesContext";
import { SidesProvider } from "@/src/context/SidesContext";
import { TagsProvider } from "@/src/context/TagsContext";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <MenuProvider>
        <PortionSizesProvider>
          <TagsProvider>
            <SidesProvider>
              <AddonsProvider>
                <div className="">
                  <Navbar />
                  {children}
                </div>
              </AddonsProvider>
            </SidesProvider>
          </TagsProvider>
        </PortionSizesProvider>
      </MenuProvider>
    </ProtectedRoute>
  );
}