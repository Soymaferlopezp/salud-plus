import {
  Calendar,
  Clock,
  Users,
  Stethoscope,
  AlertTriangle,
  ChevronRight,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";

const todaySchedule = [
  { time: "8:00 AM", patient: "Laura Pérez", type: "Control", status: "completed" },
  { time: "9:00 AM", patient: "Miguel Torres", type: "Primera vez", status: "completed" },
  { time: "10:30 AM", patient: "Roberto Martínez", type: "Seguimiento", status: "current" },
  { time: "11:30 AM", patient: "Carmen Díaz", type: "Control", status: "pending" },
  { time: "2:00 PM", patient: "José Ramírez", type: "Emergencia", status: "pending" },
  { time: "3:30 PM", patient: "Ana Morales", type: "Resultado", status: "pending" },
];

const todayPatients = [
  { name: "Roberto Martínez", cedula: "V-12345678", age: "45 años", condition: "Hipertensión", isNext: true },
  { name: "Carmen Díaz", cedula: "V-23456789", age: "32 años", condition: "Control prenatal", isNext: false },
  { name: "José Ramírez", cedula: "V-34567890", age: "58 años", condition: "Diabetes tipo 2", isNext: false },
];

const alerts = [
  { severity: "high", message: "José Ramírez: glucosa > 300 mg/dL en último control", time: "Hace 2h" },
  { severity: "medium", message: "Carmen Díaz: pendiente resultado de ecografía", time: "Hace 5h" },
  { severity: "low", message: "3 pacientes sin cita de seguimiento programada", time: "Hoy" },
];

const statusStyles: Record<string, string> = {
  completed: "bg-muted text-muted-foreground line-through",
  current: "bg-secondary/10 text-secondary border border-secondary/30 font-medium",
  pending: "text-foreground",
};

export default function DoctorDashboard() {
  const completedCount = todaySchedule.filter((s) => s.status === "completed").length;

  return (
    <DashboardLayout role="doctor" userName="Dra. María González" roleLabel="Panel del doctor">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ lineHeight: "1.2" }}>
            Buenos días, Dra. González
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Tienes {todaySchedule.length} consultas programadas hoy · {completedCount} completadas
          </p>
        </div>

        {/* Next consultation - highlighted */}
        <Card className="border-l-4 border-l-accent shadow-md bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Próxima consulta</CardTitle>
              </div>
              <Badge className="bg-accent/10 text-accent border-0">Ahora</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">RM</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Roberto Martínez</p>
                  <p className="text-sm text-muted-foreground">Seguimiento · Hipertensión</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    10:30 AM — Consultorio 204
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Ver historial</Button>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Iniciar consulta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Agenda del día</CardTitle>
                </div>
                <span className="text-xs text-muted-foreground">{todaySchedule.length} consultas</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {todaySchedule.map((slot, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${statusStyles[slot.status]}`}
                >
                  <span className="w-16 text-xs shrink-0 tabular-nums">{slot.time}</span>
                  <span className="flex-1 truncate">{slot.patient}</span>
                  <Badge variant="outline" className="text-xs shrink-0">{slot.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Patients */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Pacientes del día</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-secondary text-xs gap-1">
                  Ver todos <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayPatients.map((p, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    p.isNext
                      ? "border-secondary/30 bg-secondary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.cedula} · {p.age}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">{p.condition}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-base">Alertas médicas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${
                  alert.severity === "high"
                    ? "border-destructive/30 bg-destructive/5"
                    : alert.severity === "medium"
                    ? "border-accent/30 bg-accent/5"
                    : "border-border"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                    alert.severity === "high"
                      ? "bg-destructive"
                      : alert.severity === "medium"
                      ? "bg-accent"
                      : "bg-muted-foreground"
                  }`}
                />
                <p className="flex-1 text-foreground">{alert.message}</p>
                <span className="text-xs text-muted-foreground shrink-0">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
