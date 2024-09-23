import Navbar from "@/src/components/NavBar";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="">
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
