import { useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  ClipboardList,
  Heart,
  Home,
  Pill,
  Search,
  Stethoscope,
  UserPlus,
  Users,
  Activity,
  AlertTriangle,
  Clock,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const patientMenu = [
  { title: "Inicio", url: "/dashboard/paciente", icon: Home },
  { title: "Mis citas", url: "/dashboard/paciente/citas", icon: Calendar },
  { title: "Historial", url: "/dashboard/paciente/historial", icon: ClipboardList },
  { title: "Medicamentos", url: "/dashboard/paciente/medicamentos", icon: Pill },
  { title: "Dependientes", url: "/dashboard/paciente/dependientes", icon: Users },
];

const doctorMenu = [
  { title: "Inicio", url: "/dashboard/doctor", icon: Home },
  { title: "Agenda del día", url: "/dashboard/doctor/agenda", icon: Calendar },
  { title: "Mis pacientes", url: "/dashboard/doctor/pacientes", icon: Users },
  { title: "Consultas", url: "/dashboard/doctor/consultas", icon: Stethoscope },
  { title: "Alertas", url: "/dashboard/doctor/alertas", icon: AlertTriangle },
];

const adminMenu = [
  { title: "Inicio", url: "/dashboard/admin", icon: Home },
  { title: "Pacientes", url: "/dashboard/admin/pacientes", icon: Users },
  { title: "Citas", url: "/dashboard/admin/citas", icon: Calendar },
  { title: "Médicos", url: "/dashboard/admin/medicos", icon: Stethoscope },
  { title: "Registro rápido", url: "/dashboard/admin/registro", icon: UserPlus },
  { title: "Actividad", url: "/dashboard/admin/actividad", icon: Activity },
];

type Role = "paciente" | "doctor" | "admin";

interface DashboardSidebarProps {
  role: Role;
}

const roleLabels: Record<Role, string> = {
  paciente: "Paciente",
  doctor: "Doctor",
  admin: "Administración",
};

const roleMenus: Record<Role, typeof patientMenu> = {
  paciente: patientMenu,
  doctor: doctorMenu,
  admin: adminMenu,
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const items = roleMenus[role];

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-secondary" />
            <span className="font-semibold text-foreground text-lg">Salud Plus</span>
          </div>
        )}
        {collapsed && <Heart className="h-6 w-6 text-secondary mx-auto" />}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
            {!collapsed && roleLabels[role]}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Cerrar sesión</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
