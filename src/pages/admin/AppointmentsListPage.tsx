import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

const allAppointments = [
  { id: 1, patient: "Laura Pérez", doctor: "Dr. Pérez", specialty: "Cardiología", date: "21 Mar 2026", time: "8:00 AM", status: "Confirmada" },
  { id: 2, patient: "Miguel Torres", doctor: "Dra. González", specialty: "Medicina general", date: "21 Mar 2026", time: "9:00 AM", status: "Atendida" },
  { id: 3, patient: "Roberto Martínez", doctor: "Dra. González", specialty: "Medicina general", date: "21 Mar 2026", time: "10:30 AM", status: "En curso" },
  { id: 4, patient: "Carmen Díaz", doctor: "Dr. López", specialty: "Dermatología", date: "21 Mar 2026", time: "11:30 AM", status: "Pendiente" },
  { id: 5, patient: "José Ramírez", doctor: "Dra. González", specialty: "Medicina general", date: "21 Mar 2026", time: "2:00 PM", status: "Pendiente" },
  { id: 6, patient: "Ana Morales", doctor: "Dr. Pérez", specialty: "Cardiología", date: "22 Mar 2026", time: "8:30 AM", status: "Confirmada" },
  { id: 7, patient: "Sofía Hernández", doctor: "Dr. López", specialty: "Dermatología", date: "22 Mar 2026", time: "10:00 AM", status: "Cancelada" },
  { id: 8, patient: "Carlos Mendoza", doctor: "Dra. González", specialty: "Medicina general", date: "22 Mar 2026", time: "11:00 AM", status: "Confirmada" },
];

const statusStyles: Record<string, string> = {
  Confirmada: "bg-blue-50 text-blue-700 border-blue-200",
  Atendida: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "En curso": "bg-amber-50 text-amber-700 border-amber-200",
  Pendiente: "bg-muted text-muted-foreground",
  Cancelada: "bg-red-50 text-red-700 border-red-200",
};

const ITEMS_PER_PAGE = 5;

export default function AppointmentsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allAppointments.filter((a) => {
    const matchesSearch =
      a.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <DashboardLayout role="admin" userName="Sandra López" roleLabel="Panel administrativo">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground" style={{ lineHeight: "1.2" }}>
              Citas médicas
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} cita{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 self-start">
            <Plus className="h-4 w-4" />
            Nueva cita
          </Button>
        </div>

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
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setCurrentPage(1);
                }}
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
                  <Calendar className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-1">Sin resultados</p>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  No se encontraron citas con los filtros aplicados.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
