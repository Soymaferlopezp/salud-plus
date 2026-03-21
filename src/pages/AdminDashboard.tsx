import {
  Calendar,
  Clock,
  UserPlus,
  Search,
  Activity,
  ChevronRight,
  TrendingUp,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/DashboardLayout";

const todayStats = [
  { label: "Citas hoy", value: "34", icon: Calendar, trend: "+3 vs ayer" },
  { label: "Atendidas", value: "18", icon: CheckCircle2, trend: "53%" },
  { label: "Canceladas", value: "2", icon: XCircle, trend: "-1 vs ayer" },
  { label: "Pacientes nuevos", value: "5", icon: Users, trend: "+2 vs ayer" },
];

const todayAppointments = [
  { time: "8:00 AM", patient: "Laura Pérez", doctor: "Dr. Pérez", type: "Control", status: "Atendida" },
  { time: "9:00 AM", patient: "Miguel Torres", doctor: "Dra. González", type: "Primera vez", status: "Atendida" },
  { time: "10:30 AM", patient: "Roberto Martínez", doctor: "Dra. González", type: "Seguimiento", status: "En curso" },
  { time: "11:30 AM", patient: "Carmen Díaz", doctor: "Dr. López", type: "Control", status: "Pendiente" },
  { time: "2:00 PM", patient: "José Ramírez", doctor: "Dra. González", type: "Emergencia", status: "Pendiente" },
];

const recentActivity = [
  { action: "Nuevo paciente registrado", detail: "Ana Morales — V-45678901", time: "Hace 15 min", type: "register" },
  { action: "Cita cancelada", detail: "Pedro Sánchez — Cardiología", time: "Hace 32 min", type: "cancel" },
  { action: "Resultado cargado", detail: "Lab. Hemograma — Laura Pérez", time: "Hace 1h", type: "result" },
  { action: "Cita reprogramada", detail: "Miguel Torres — 28 Mar 2026", time: "Hace 2h", type: "reschedule" },
];

const statusBadge: Record<string, string> = {
  Atendida: "bg-muted text-muted-foreground",
  "En curso": "bg-secondary/10 text-secondary border-secondary/30",
  Pendiente: "bg-accent/10 text-accent border-accent/30",
};

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin" userName="Sandra López" roleLabel="Panel administrativo">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ lineHeight: "1.2" }}>
            Panel administrativo
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Resumen operativo del día — 21 de marzo, 2026
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {todayStats.map((stat, i) => (
            <Card key={i} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-secondary" />
                  <span className="text-xs text-muted-foreground">{stat.trend}</span>
                </div>
                <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick actions row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <UserPlus className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Registro rápido</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Registra un nuevo paciente de forma rápida.
              </p>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Nuevo paciente
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Buscar paciente</span>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Cédula o nombre..."
                  className="text-sm h-10"
                />
                <Button variant="outline" size="icon" className="shrink-0 h-10 w-10">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Citas del día</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-secondary text-xs gap-1">
                  Ver todas <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-xs font-medium text-muted-foreground">Hora</th>
                      <th className="text-left py-2 text-xs font-medium text-muted-foreground">Paciente</th>
                      <th className="text-left py-2 text-xs font-medium text-muted-foreground hidden sm:table-cell">Doctor</th>
                      <th className="text-left py-2 text-xs font-medium text-muted-foreground hidden md:table-cell">Tipo</th>
                      <th className="text-right py-2 text-xs font-medium text-muted-foreground">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.map((apt, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-2.5 tabular-nums text-muted-foreground">{apt.time}</td>
                        <td className="py-2.5 font-medium text-foreground">{apt.patient}</td>
                        <td className="py-2.5 text-muted-foreground hidden sm:table-cell">{apt.doctor}</td>
                        <td className="py-2.5 text-muted-foreground hidden md:table-cell">{apt.type}</td>
                        <td className="py-2.5 text-right">
                          <Badge variant="outline" className={`text-xs ${statusBadge[apt.status] || ""}`}>
                            {apt.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Actividad reciente</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div
                    className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                      item.type === "register"
                        ? "bg-secondary"
                        : item.type === "cancel"
                        ? "bg-destructive"
                        : item.type === "result"
                        ? "bg-accent"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
