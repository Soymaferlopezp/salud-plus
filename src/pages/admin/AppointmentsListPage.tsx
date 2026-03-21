import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar as CalendarIcon,
  List,
  Clock,
  User,
  Stethoscope,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// --- Data ---

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  dateObj: Date;
  time: string;
  status: string;
  type: string;
}

const doctors = [
  { name: "Dr. Alejandro Pérez", specialty: "Cardiología" },
  { name: "Dra. María González", specialty: "Medicina general" },
  { name: "Dr. Fernando López", specialty: "Dermatología" },
  { name: "Dra. Isabel Rodríguez", specialty: "Pediatría" },
  { name: "Dra. Carolina Vargas", specialty: "Ginecología" },
];

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
];

const allAppointments: Appointment[] = [
  { id: 1, patient: "Laura Pérez", doctor: "Dr. Alejandro Pérez", specialty: "Cardiología", date: "21 Mar 2026", dateObj: new Date(2026, 2, 21), time: "8:00 AM", status: "Confirmada", type: "Control" },
  { id: 2, patient: "Miguel Torres", doctor: "Dra. María González", specialty: "Medicina general", date: "21 Mar 2026", dateObj: new Date(2026, 2, 21), time: "9:00 AM", status: "Atendida", type: "Primera vez" },
  { id: 3, patient: "Roberto Martínez", doctor: "Dra. María González", specialty: "Medicina general", date: "21 Mar 2026", dateObj: new Date(2026, 2, 21), time: "10:30 AM", status: "En curso", type: "Seguimiento" },
  { id: 4, patient: "Carmen Díaz", doctor: "Dr. Fernando López", specialty: "Dermatología", date: "21 Mar 2026", dateObj: new Date(2026, 2, 21), time: "11:30 AM", status: "Pendiente", type: "Control" },
  { id: 5, patient: "José Ramírez", doctor: "Dra. María González", specialty: "Medicina general", date: "21 Mar 2026", dateObj: new Date(2026, 2, 21), time: "2:00 PM", status: "Pendiente", type: "Emergencia" },
  { id: 6, patient: "Ana Morales", doctor: "Dr. Alejandro Pérez", specialty: "Cardiología", date: "22 Mar 2026", dateObj: new Date(2026, 2, 22), time: "8:30 AM", status: "Confirmada", type: "Control" },
  { id: 7, patient: "Sofía Hernández", doctor: "Dr. Fernando López", specialty: "Dermatología", date: "22 Mar 2026", dateObj: new Date(2026, 2, 22), time: "10:00 AM", status: "Cancelada", type: "Primera vez" },
  { id: 8, patient: "Carlos Mendoza", doctor: "Dra. María González", specialty: "Medicina general", date: "22 Mar 2026", dateObj: new Date(2026, 2, 22), time: "11:00 AM", status: "Confirmada", type: "Seguimiento" },
  { id: 9, patient: "Pedro Sánchez", doctor: "Dra. Isabel Rodríguez", specialty: "Pediatría", date: "23 Mar 2026", dateObj: new Date(2026, 2, 23), time: "9:00 AM", status: "Confirmada", type: "Control" },
  { id: 10, patient: "María Luisa Fernández", doctor: "Dra. Carolina Vargas", specialty: "Ginecología", date: "23 Mar 2026", dateObj: new Date(2026, 2, 23), time: "10:30 AM", status: "Pendiente", type: "Primera vez" },
  { id: 11, patient: "Luis Alberto Rivas", doctor: "Dr. Alejandro Pérez", specialty: "Cardiología", date: "24 Mar 2026", dateObj: new Date(2026, 2, 24), time: "8:00 AM", status: "Confirmada", type: "Seguimiento" },
  { id: 12, patient: "Gabriela Montero", doctor: "Dra. María González", specialty: "Medicina general", date: "25 Mar 2026", dateObj: new Date(2026, 2, 25), time: "3:00 PM", status: "Pendiente", type: "Primera vez" },
];

const statusStyles: Record<string, string> = {
  Confirmada: "bg-blue-50 text-blue-700 border-blue-200",
  Atendida: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "En curso": "bg-amber-50 text-amber-700 border-amber-200",
  Pendiente: "bg-muted text-muted-foreground",
  Cancelada: "bg-red-50 text-red-700 border-red-200",
};

const statusDot: Record<string, string> = {
  Confirmada: "bg-blue-500",
  Atendida: "bg-emerald-500",
  "En curso": "bg-amber-500",
  Pendiente: "bg-gray-400",
  Cancelada: "bg-red-400",
};

const ITEMS_PER_PAGE = 6;

// --- Component ---

export default function AppointmentsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 2, 21));
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(2026, 2, 21), { weekStartsOn: 1 }));
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // List filters
  const filtered = allAppointments.filter((a) => {
    const matchesSearch =
      a.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || a.doctor === doctorFilter;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Calendar helpers
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const appointmentsForDay = (day: Date) =>
    allAppointments.filter((a) => isSameDay(a.dateObj, day));
  const datesWithAppointments = allAppointments.map((a) => a.dateObj);

  return (
    <DashboardLayout role="admin" userName="Sandra López" roleLabel="Panel administrativo">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground" style={{ lineHeight: "1.2" }}>
              Gestión de citas
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Agenda, visualiza y administra las citas médicas
            </p>
          </div>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 self-start"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-4 w-4" />
            Nueva cita
          </Button>
        </div>

        {/* Tabs: Calendar / List */}
        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              Lista
            </TabsTrigger>
          </TabsList>

          {/* ===== CALENDAR VIEW ===== */}
          <TabsContent value="calendar" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
              {/* Mini calendar + filters */}
              <div className="space-y-4">
                <Card className="shadow-sm">
                  <CardContent className="p-3">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(d) => {
                        if (d) {
                          setSelectedDate(d);
                          setWeekStart(startOfWeek(d, { weekStartsOn: 1 }));
                        }
                      }}
                      className={cn("p-0 pointer-events-auto")}
                      modifiers={{ hasAppointment: datesWithAppointments }}
                      modifiersStyles={{
                        hasAppointment: {
                          fontWeight: 700,
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                        },
                      }}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-medium text-foreground">Filtrar por doctor</p>
                    <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos los doctores" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los doctores</SelectItem>
                        {doctors.map((d) => (
                          <SelectItem key={d.name} value={d.name}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Day summary */}
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      Resumen del día
                    </p>
                    <p className="text-lg font-semibold text-foreground capitalize">
                      {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                    </p>
                    {(() => {
                      const dayApts = appointmentsForDay(selectedDate).filter(
                        (a) => doctorFilter === "all" || a.doctor === doctorFilter
                      );
                      return (
                        <div className="mt-3 space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground tabular-nums">{dayApts.length}</span> cita{dayApts.length !== 1 ? "s" : ""}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground tabular-nums">
                              {dayApts.filter((a) => a.status === "Pendiente" || a.status === "Confirmada").length}
                            </span>{" "}
                            pendiente{dayApts.filter((a) => a.status === "Pendiente" || a.status === "Confirmada").length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>

              {/* Week grid */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                      Semana del {format(weekStart, "d MMM", { locale: es })} al{" "}
                      {format(addDays(weekStart, 6), "d MMM yyyy", { locale: es })}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setWeekStart(addDays(weekStart, -7))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => {
                          const today = new Date(2026, 2, 21);
                          setWeekStart(startOfWeek(today, { weekStartsOn: 1 }));
                          setSelectedDate(today);
                        }}
                      >
                        Hoy
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setWeekStart(addDays(weekStart, 7))}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day) => {
                      const dayApts = appointmentsForDay(day).filter(
                        (a) => doctorFilter === "all" || a.doctor === doctorFilter
                      );
                      const isSelected = isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, new Date(2026, 2, 21));

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => setSelectedDate(day)}
                          className={cn(
                            "rounded-xl border p-3 text-left transition-all hover:shadow-md min-h-[140px] flex flex-col",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={cn(
                                "text-xs font-medium uppercase",
                                isSelected ? "text-primary" : "text-muted-foreground"
                              )}
                            >
                              {format(day, "EEE", { locale: es })}
                            </span>
                            <span
                              className={cn(
                                "text-sm font-semibold tabular-nums h-7 w-7 flex items-center justify-center rounded-full",
                                isToday && "bg-primary text-primary-foreground",
                                isSelected && !isToday && "bg-primary/10 text-primary"
                              )}
                            >
                              {format(day, "d")}
                            </span>
                          </div>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            {dayApts.slice(0, 3).map((apt) => (
                              <div
                                key={apt.id}
                                className="flex items-center gap-1.5 text-xs truncate"
                              >
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full shrink-0",
                                    statusDot[apt.status] || "bg-gray-400"
                                  )}
                                />
                                <span className="truncate text-foreground">{apt.time}</span>
                              </div>
                            ))}
                            {dayApts.length > 3 && (
                              <p className="text-xs text-muted-foreground">
                                +{dayApts.length - 3} más
                              </p>
                            )}
                            {dayApts.length === 0 && (
                              <p className="text-xs text-muted-foreground italic">Sin citas</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected day detail */}
                  {(() => {
                    const dayApts = appointmentsForDay(selectedDate).filter(
                      (a) => doctorFilter === "all" || a.doctor === doctorFilter
                    );
                    if (dayApts.length === 0) return null;

                    return (
                      <div className="mt-6 space-y-2">
                        <p className="text-sm font-medium text-foreground capitalize">
                          Citas del {format(selectedDate, "EEEE d", { locale: es })}
                        </p>
                        <div className="space-y-2">
                          {dayApts.map((apt) => (
                            <div
                              key={apt.id}
                              className="flex items-center gap-4 rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
                            >
                              <div className="flex items-center gap-2 w-20 shrink-0">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm tabular-nums font-medium text-foreground">
                                  {apt.time}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {apt.patient}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {apt.doctor} · {apt.specialty}
                                </p>
                              </div>
                              <Badge variant="outline" className={cn("shrink-0 text-xs", statusStyles[apt.status])}>
                                {apt.status}
                              </Badge>
                              <div className="flex items-center gap-1 shrink-0">
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ===== LIST VIEW ===== */}
          <TabsContent value="list" className="space-y-4">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por paciente o doctor..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-9"
                    />
                  </div>
                  <Select
                    value={doctorFilter}
                    onValueChange={(v) => { setDoctorFilter(v); setCurrentPage(1); }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <Stethoscope className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {doctors.map((d) => (
                        <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={statusFilter}
                    onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
                  >
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Confirmada">Confirmada</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="En curso">En curso</SelectItem>
                      <SelectItem value="Atendida">Atendida</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-0">
                {paginated.length > 0 ? (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead>Paciente</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead className="hidden md:table-cell">Especialidad</TableHead>
                          <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                          <TableHead className="hidden sm:table-cell">Hora</TableHead>
                          <TableHead className="hidden lg:table-cell">Tipo</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginated.map((apt) => (
                          <TableRow key={apt.id} className="group">
                            <TableCell className="font-medium text-foreground">{apt.patient}</TableCell>
                            <TableCell className="text-muted-foreground">{apt.doctor}</TableCell>
                            <TableCell className="hidden md:table-cell text-muted-foreground">{apt.specialty}</TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground tabular-nums">{apt.date}</TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground tabular-nums">{apt.time}</TableCell>
                            <TableCell className="hidden lg:table-cell text-muted-foreground">{apt.type}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={statusStyles[apt.status] || ""}>
                                {apt.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver">
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" title="Editar">
                                  <Pencil className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                        {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de {filtered.length}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button key={page} variant={page === currentPage ? "default" : "outline"} size="icon" className="h-8 w-8 tabular-nums" onClick={() => setCurrentPage(page)}>
                            {page}
                          </Button>
                        ))}
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                      <CalendarIcon className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium mb-1">Sin resultados</p>
                    <p className="text-sm text-muted-foreground text-center max-w-xs">
                      No se encontraron citas con los filtros aplicados.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => { setSearchQuery(""); setStatusFilter("all"); setDoctorFilter("all"); }}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Appointment Dialog */}
      <CreateAppointmentDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </DashboardLayout>
  );
}

// --- Create Appointment Dialog ---

function CreateAppointmentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  const selectedDoctorData = doctors.find((d) => d.name === selectedDoctor);

  // Simulated occupied slots for selected doctor/date
  const occupiedSlots = ["9:00 AM", "10:30 AM", "2:00 PM"];

  const resetForm = () => {
    setStep(1);
    setLoading(false);
    setSuccess(false);
    setPatientSearch("");
    setSelectedDoctor("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setAppointmentType("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetForm, 200);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const canProceedStep1 = patientSearch.length > 0;
  const canProceedStep2 = selectedDoctor !== "";
  const canProceedStep3 = selectedDate && selectedTime !== "";
  const canSubmit = appointmentType !== "";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px]">
        {success ? (
          <div className="flex flex-col items-center py-8">
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-1">Cita agendada</p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              La cita ha sido registrada exitosamente. El paciente recibirá una notificación.
            </p>
            <Button className="mt-6" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Nueva cita médica</DialogTitle>
              <DialogDescription>
                Paso {step} de 4 — {
                  step === 1
                    ? "Selecciona el paciente"
                    : step === 2
                    ? "Selecciona el doctor"
                    : step === 3
                    ? "Elige fecha y hora"
                    : "Confirma los detalles"
                }
              </DialogDescription>
            </DialogHeader>

            {/* Step indicator */}
            <div className="flex items-center gap-2 py-1">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    s <= step ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>

            {/* Step 1: Patient */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Buscar paciente</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Nombre o cédula del paciente..."
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                {patientSearch.length > 2 && (
                  <Card className="shadow-sm">
                    <CardContent className="p-2 space-y-1">
                      {["Laura Pérez — V-12345678", "Luis Pérez — V-98765432"].map((result) => (
                        <button
                          key={result}
                          onClick={() => setPatientSearch(result.split(" — ")[0])}
                          className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                        >
                          {result}
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 2: Doctor */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Especialidad y doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((d) => (
                        <SelectItem key={d.name} value={d.name}>
                          {d.name} — {d.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedDoctorData && (
                  <Card className="shadow-sm border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                          <Stethoscope className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{selectedDoctorData.name}</p>
                          <p className="text-xs text-muted-foreground">{selectedDoctorData.specialty}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? format(selectedDate, "PPP", { locale: es })
                          : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(2026, 2, 21)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {selectedDate && (
                  <div className="space-y-2">
                    <Label>Horarios disponibles</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isOccupied = occupiedSlots.includes(slot);
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            disabled={isOccupied}
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "rounded-lg border px-2 py-2 text-xs font-medium tabular-nums transition-all",
                              isOccupied
                                ? "border-border bg-muted text-muted-foreground cursor-not-allowed line-through"
                                : isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-muted border border-border" />
                      Horarios tachados no disponibles
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de cita</Label>
                  <Select value={appointmentType} onValueChange={setAppointmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primera vez">Primera vez</SelectItem>
                      <SelectItem value="Control">Control</SelectItem>
                      <SelectItem value="Seguimiento">Seguimiento</SelectItem>
                      <SelectItem value="Emergencia">Emergencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="shadow-sm bg-muted/30">
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-medium text-foreground">Resumen de la cita</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Paciente</span>
                        <span className="font-medium text-foreground">{patientSearch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doctor</span>
                        <span className="font-medium text-foreground">{selectedDoctor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fecha</span>
                        <span className="font-medium text-foreground tabular-nums">
                          {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hora</span>
                        <span className="font-medium text-foreground tabular-nums">{selectedTime}</span>
                      </div>
                      {appointmentType && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tipo</span>
                          <span className="font-medium text-foreground">{appointmentType}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Volver
                </Button>
              )}
              {step < 4 ? (
                <Button
                  disabled={
                    (step === 1 && !canProceedStep1) ||
                    (step === 2 && !canProceedStep2) ||
                    (step === 3 && !canProceedStep3)
                  }
                  onClick={() => setStep(step + 1)}
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  disabled={!canSubmit || loading}
                  onClick={handleSubmit}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Agendando...
                    </>
                  ) : (
                    "Agendar cita"
                  )}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
