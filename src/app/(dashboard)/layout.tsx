import Navbar from "@/src/components/NavBar";
import OrderNotification from "@/src/components/OrderNotification ";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { AddonsProvider } from "@/src/context/AddonsContext";
import { CategoriesProvider } from "@/src/context/CategoriesContext";
import { DiscountsProvider } from "@/src/context/DiscountContext";
import { MenuProvider } from "@/src/context/MenuContext";
import { OrdersProvider } from "@/src/context/OrdersContext";
import { PortionSizesProvider } from "@/src/context/PortionSizesContext";
import { SidesProvider } from "@/src/context/SidesContext";
import { TicketProvider } from "@/src/context/SupportTicketContext";
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
                    <DiscountsProvider>
                      <TicketProvider>
                        <div className="">
                          <Navbar />
                          {children}
                          <OrderNotification />
                        </div>
                      </TicketProvider>
                    </DiscountsProvider>
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
