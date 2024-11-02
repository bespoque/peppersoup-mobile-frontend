import Navbar from "@/src/components/NavBar";
import OrderNotification from "@/src/components/OrderNotification ";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { AddonsProvider } from "@/src/context/AddonsContext";
import { CategoriesProvider } from "@/src/context/CategoriesContext";
import { MenuProvider } from "@/src/context/MenuContext";
import { OrdersProvider } from "@/src/context/OrdersContext";
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
                <CategoriesProvider>
                  <OrdersProvider>
                    <div className="">
                      <Navbar />
                      {children}
                      <OrderNotification />
                    </div>
                  </OrdersProvider>
                </CategoriesProvider>
              </AddonsProvider>
            </SidesProvider>
          </TagsProvider>
        </PortionSizesProvider>
      </MenuProvider>
    </ProtectedRoute>
     
  );
}
