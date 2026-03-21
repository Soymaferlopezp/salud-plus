import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const allPatients = [
  { id: 1, name: "Laura Pérez", age: 34, phone: "0414-555-1234", email: "laura.perez@email.com", address: "Caracas, Miranda", date: "15 Mar 2026", status: "Activo", blood: "O+" },
  { id: 2, name: "Miguel Torres", age: 45, phone: "0424-555-5678", email: "miguel.t@email.com", address: "Valencia, Carabobo", date: "12 Mar 2026", status: "Activo", blood: "A+" },
  { id: 3, name: "Carmen Díaz", age: 28, phone: "0412-555-9012", email: "carmen.diaz@email.com", address: "Maracaibo, Zulia", date: "10 Mar 2026", status: "Inactivo", blood: "B-" },
  { id: 4, name: "Roberto Martínez", age: 52, phone: "0416-555-3456", email: "r.martinez@email.com", address: "Barquisimeto, Lara", date: "08 Mar 2026", status: "Activo", blood: "AB+" },
  { id: 5, name: "Ana Morales", age: 61, phone: "0426-555-7890", email: "ana.morales@email.com", address: "Mérida, Mérida", date: "05 Mar 2026", status: "Activo", blood: "O-" },
  { id: 6, name: "José Ramírez", age: 39, phone: "0414-555-2345", email: "jose.r@email.com", address: "Caracas, Miranda", date: "01 Mar 2026", status: "Inactivo", blood: "A-" },
  { id: 7, name: "Sofía Hernández", age: 22, phone: "0424-555-6789", email: "sofia.h@email.com", address: "Puerto La Cruz, Anzoátegui", date: "28 Feb 2026", status: "Activo", blood: "B+" },
  { id: 8, name: "Carlos Mendoza", age: 47, phone: "0412-555-0123", email: "carlos.m@email.com", address: "San Cristóbal, Táchira", date: "25 Feb 2026", status: "Activo", blood: "O+" },
];

const ITEMS_PER_PAGE = 5;

export default function PatientsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);

  const filtered = allPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <DashboardLayout role="admin" userName="Sandra López" roleLabel="Panel administrativo">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground" style={{ lineHeight: "1.2" }}>
              Pacientes
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} paciente{filtered.length !== 1 ? "s" : ""} registrado{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 self-start">
            <Plus className="h-4 w-4" />
            Nuevo paciente
          </Button>
        </div>

        {/* Search & filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, correo o teléfono..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-3">
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
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {paginated.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Paciente</TableHead>
                      <TableHead className="hidden sm:table-cell">Edad</TableHead>
                      <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                      <TableHead className="hidden lg:table-cell">Correo</TableHead>
                      <TableHead className="hidden xl:table-cell">Dirección</TableHead>
                      <TableHead className="hidden sm:table-cell">Registro</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((patient) => (
                      <TableRow key={patient.id} className="group">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                                {getInitials(patient.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground text-sm">{patient.name}</p>
                              <p className="text-xs text-muted-foreground sm:hidden">{patient.phone}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground tabular-nums">
                          {patient.age} años
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground tabular-nums">
                          {patient.phone}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">
                          {patient.email}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-muted-foreground">
                          {patient.address}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground tabular-nums text-sm">
                          {patient.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              patient.status === "Activo"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {patient.status}
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="Eliminar"
                              onClick={() => setDeleteDialog(patient.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de {filtered.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8 tabular-nums"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-1">Sin resultados</p>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  No se encontraron pacientes con los filtros aplicados. Intenta con otra búsqueda.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialog !== null} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar paciente?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminarán todos los datos asociados a este paciente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialog(null)}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
