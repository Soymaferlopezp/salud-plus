import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

type Role = "paciente" | "doctor" | "admin";

interface DashboardLayoutProps {
  role: Role;
  userName: string;
  roleLabel: string;
  children: React.ReactNode;
}

export function DashboardLayout({ role, userName, roleLabel, children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader userName={userName} role={roleLabel} />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
