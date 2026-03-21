import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RegistrationStepper from "@/components/RegistrationStepper";
import saludplusLogo from "@/assets/saludplus-logo.png";

const steps = [
  { label: "Datos personales" },
  { label: "Contacto" },
  { label: "Ubicación" },
  { label: "Info. médica" },
];

const RegisterPatientPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [form, setForm] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    sexo: "",
    telefono: "",
    correo: "",
    estado: "",
    municipio: "",
    parroquia: "",
    sector: "",
    tipoSangre: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 0) {
      if (!form.cedula.trim()) newErrors.cedula = "Ingresa tu número de cédula";
      else if (!/^\d{6,15}$/.test(form.cedula.trim())) newErrors.cedula = "Formato inválido";
      if (!form.nombres.trim()) newErrors.nombres = "Ingresa tus nombres";
      if (!form.apellidos.trim()) newErrors.apellidos = "Ingresa tus apellidos";
      if (!form.fechaNacimiento) newErrors.fechaNacimiento = "Selecciona tu fecha de nacimiento";
      if (!form.sexo) newErrors.sexo = "Selecciona tu sexo";
    } else if (currentStep === 1) {
      if (!form.telefono.trim()) newErrors.telefono = "Ingresa tu teléfono";
      if (!form.correo.trim()) newErrors.correo = "Ingresa tu correo electrónico";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) newErrors.correo = "Correo inválido";
    } else if (currentStep === 2) {
      if (!form.estado.trim()) newErrors.estado = "Ingresa tu estado";
      if (!form.municipio.trim()) newErrors.municipio = "Ingresa tu municipio";
    } else if (currentStep === 3) {
      if (!form.tipoSangre) newErrors.tipoSangre = "Selecciona tu tipo de sangre";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 1800);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
    else navigate("/crear-cuenta");
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">¡Registro completado!</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Tu cuenta ha sido creada exitosamente. Ya puedes acceder con tu número de cédula.
          </p>
          <Button onClick={() => navigate("/")} className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
            Ir al inicio de sesión
          </Button>
        </div>
      </div>
    );
  }

  const fieldClass = "mt-1.5";
  const errorClass = "text-xs text-destructive mt-1 transition-opacity";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-5 flex items-center gap-3 max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
        <div className="flex-1" />
        <img src={saludplusLogo} alt="Salud Plus" className="h-7 object-contain" />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-6 pb-16 pt-2">
        <div className="w-full max-w-lg space-y-7">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-foreground tracking-tight" style={{ lineHeight: "1.2" }}>
              Registro de paciente
            </h1>
            <p className="text-sm text-muted-foreground">
              Completa los datos para crear tu cuenta
            </p>
          </div>

          <RegistrationStepper steps={steps} currentStep={currentStep} />

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            {/* Step 0: Datos personales */}
            {currentStep === 0 && (
              <>
                <div>
                  <Label htmlFor="cedula">Número de cédula</Label>
                  <Input id="cedula" placeholder="Ej: 12345678" value={form.cedula} onChange={(e) => update("cedula", e.target.value)} className={fieldClass} />
                  {errors.cedula && <p className={errorClass}>{errors.cedula}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombres">Nombres</Label>
                    <Input id="nombres" placeholder="Ej: María José" value={form.nombres} onChange={(e) => update("nombres", e.target.value)} className={fieldClass} />
                    {errors.nombres && <p className={errorClass}>{errors.nombres}</p>}
                  </div>
                  <div>
                    <Label htmlFor="apellidos">Apellidos</Label>
                    <Input id="apellidos" placeholder="Ej: García López" value={form.apellidos} onChange={(e) => update("apellidos", e.target.value)} className={fieldClass} />
                    {errors.apellidos && <p className={errorClass}>{errors.apellidos}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                    <Input id="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={(e) => update("fechaNacimiento", e.target.value)} className={fieldClass} />
                    {errors.fechaNacimiento && <p className={errorClass}>{errors.fechaNacimiento}</p>}
                  </div>
                  <div>
                    <Label>Sexo</Label>
                    <Select value={form.sexo} onValueChange={(v) => update("sexo", v)}>
                      <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecciona" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.sexo && <p className={errorClass}>{errors.sexo}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Contacto */}
            {currentStep === 1 && (
              <>
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="Ej: 0412-1234567" value={form.telefono} onChange={(e) => update("telefono", e.target.value)} className={fieldClass} />
                  {errors.telefono && <p className={errorClass}>{errors.telefono}</p>}
                </div>
                <div>
                  <Label htmlFor="correo">Correo electrónico</Label>
                  <Input id="correo" type="email" placeholder="Ej: maria@correo.com" value={form.correo} onChange={(e) => update("correo", e.target.value)} className={fieldClass} />
                  {errors.correo && <p className={errorClass}>{errors.correo}</p>}
                </div>
              </>
            )}

            {/* Step 2: Ubicación */}
            {currentStep === 2 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" placeholder="Ej: Miranda" value={form.estado} onChange={(e) => update("estado", e.target.value)} className={fieldClass} />
                    {errors.estado && <p className={errorClass}>{errors.estado}</p>}
                  </div>
                  <div>
                    <Label htmlFor="municipio">Municipio</Label>
                    <Input id="municipio" placeholder="Ej: Sucre" value={form.municipio} onChange={(e) => update("municipio", e.target.value)} className={fieldClass} />
                    {errors.municipio && <p className={errorClass}>{errors.municipio}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parroquia">Parroquia</Label>
                    <Input id="parroquia" placeholder="Ej: Petare" value={form.parroquia} onChange={(e) => update("parroquia", e.target.value)} className={fieldClass} />
                  </div>
                  <div>
                    <Label htmlFor="sector">Sector</Label>
                    <Input id="sector" placeholder="Ej: La Urbina" value={form.sector} onChange={(e) => update("sector", e.target.value)} className={fieldClass} />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Info médica */}
            {currentStep === 3 && (
              <div>
                <Label>Tipo de sangre</Label>
                <Select value={form.tipoSangre} onValueChange={(v) => update("tipoSangre", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecciona tu tipo de sangre" /></SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tipoSangre && <p className={errorClass}>{errors.tipoSangre}</p>}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={handleBack} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando…
                </>
              ) : currentStep === steps.length - 1 ? (
                "Guardar"
              ) : (
                <>
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPatientPage;
