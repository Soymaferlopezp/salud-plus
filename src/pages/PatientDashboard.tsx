import { Calendar, Clock, ClipboardList, Pill, Users, ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";

const nextAppointment = {
  doctor: "Dra. María González",
  specialty: "Cardiología",
  date: "25 de marzo, 2026",
  time: "10:30 AM",
  location: "Consultorio 204, Torre Médica Central",
};

const recentHistory = [
  { date: "12 Mar 2026", type: "Consulta", doctor: "Dr. Pérez", status: "Completada" },
  { date: "28 Feb 2026", type: "Laboratorio", doctor: "Lab. Central", status: "Resultados listos" },
  { date: "15 Feb 2026", type: "Consulta", doctor: "Dra. González", status: "Completada" },
];

const medications = [
  { name: "Losartán 50mg", dosage: "1 tableta diaria", time: "8:00 AM", remaining: "12 días" },
  { name: "Metformina 850mg", dosage: "1 tableta c/12h", time: "8:00 AM / 8:00 PM", remaining: "8 días" },
  { name: "Aspirina 100mg", dosage: "1 tableta diaria", time: "2:00 PM", remaining: "20 días" },
];

const dependents = [
  { name: "Ana Martínez R.", relation: "Hija", age: "8 años", lastVisit: "10 Mar 2026" },
  { name: "Carlos Martínez L.", relation: "Padre", age: "72 años", lastVisit: "5 Mar 2026" },
];

export default function PatientDashboard() {
  return (
    <DashboardLayout role="paciente" userName="Roberto Martínez" roleLabel="Panel del paciente">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ lineHeight: "1.2" }}>
            Hola, Roberto
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Aquí tienes un resumen de tu actividad médica.
          </p>
        </div>

        {/* Next Appointment - Highlighted */}
        <Card className="border-l-4 border-l-secondary shadow-md bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                <CardTitle className="text-lg">Próxima cita</CardTitle>
              </div>
              <Badge className="bg-secondary/10 text-secondary border-0 font-medium">
                Confirmada
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 space-y-1.5">
                <p className="font-semibold text-foreground">{nextAppointment.doctor}</p>
                <p className="text-sm text-muted-foreground">{nextAppointment.specialty}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {nextAppointment.date} — {nextAppointment.time}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {nextAppointment.location}
                </div>
              </div>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                Ver detalles
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent History */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Historial reciente</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-secondary text-xs gap-1">
                  Ver todo <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentHistory.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.type}</p>
                    <p className="text-xs text-muted-foreground">{item.doctor} · {item.date}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      item.status === "Resultados listos"
                        ? "border-accent text-accent text-xs"
                        : "text-xs"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Medicamentos actuales</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">{medications.length} activos</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {medications.map((med, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between py-2.5 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.dosage} · {med.time}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{med.remaining}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dependents */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Dependientes registrados</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-secondary text-xs gap-1">
                Agregar <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dependents.map((dep, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-secondary">
                      {dep.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{dep.name}</p>
                    <p className="text-xs text-muted-foreground">{dep.relation} · {dep.age}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Últ: {dep.lastVisit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
