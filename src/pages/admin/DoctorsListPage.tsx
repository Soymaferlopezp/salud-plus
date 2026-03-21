import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allDoctors = [
  { id: 1, name: "Dr. Alejandro Pérez", specialty: "Cardiología", phone: "0414-555-1111", email: "a.perez@saludplus.com", patients: 128, status: "Activo" },
  { id: 2, name: "Dra. María González", specialty: "Medicina general", phone: "0424-555-2222", email: "m.gonzalez@saludplus.com", patients: 245, status: "Activo" },
  { id: 3, name: "Dr. Fernando López", specialty: "Dermatología", phone: "0412-555-3333", email: "f.lopez@saludplus.com", patients: 87, status: "Activo" },
  { id: 4, name: "Dra. Isabel Rodríguez", specialty: "Pediatría", phone: "0416-555-4444", email: "i.rodriguez@saludplus.com", patients: 192, status: "Inactivo" },
  { id: 5, name: "Dr. Ricardo Blanco", specialty: "Traumatología", phone: "0426-555-5555", email: "r.blanco@saludplus.com", patients: 63, status: "Activo" },
  { id: 6, name: "Dra. Carolina Vargas", specialty: "Ginecología", phone: "0414-555-6666", email: "c.vargas@saludplus.com", patients: 154, status: "Activo" },
];

const ITEMS_PER_PAGE = 5;

export default function DoctorsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const specialties = [...new Set(allDoctors.map((d) => d.specialty))];

  const filtered = allDoctors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || d.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getInitials = (name: string) =>
    name.replace(/Dr[a]?\.\s?/, "").split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <DashboardLayout role="admin" userName="Sandra López" roleLabel="Panel administrativo">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground" style={{ lineHeight: "1.2" }}>
              Médicos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} médico{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 self-start">
            <Plus className="h-4 w-4" />
            Nuevo médico
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o correo..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="pl-9"
                />
              </div>
              <Select value={specialtyFilter} onValueChange={(v) => { setSpecialtyFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {specialties.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
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
                      <TableHead>Médico</TableHead>
                      <TableHead className="hidden sm:table-cell">Especialidad</TableHead>
                      <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                      <TableHead className="hidden lg:table-cell">Correo</TableHead>
                      <TableHead className="hidden sm:table-cell text-center">Pacientes</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((doc) => (
                      <TableRow key={doc.id} className="group">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-secondary/10 text-secondary text-xs font-medium">
                                {getInitials(doc.name)}
                              </AvatarFallback>
                            </Avatar>
                            <p className="font-medium text-foreground text-sm">{doc.name}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">{doc.specialty}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground tabular-nums">{doc.phone}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{doc.email}</TableCell>
                        <TableCell className="hidden sm:table-cell text-center tabular-nums">{doc.patients}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              doc.status === "Activo"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {doc.status}
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
                  <Stethoscope className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-1">Sin resultados</p>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  No se encontraron médicos con los filtros aplicados.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setSpecialtyFilter("all"); }}>
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
