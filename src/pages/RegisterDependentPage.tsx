import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import RegistrationStepper from "@/components/RegistrationStepper";
import saludplusLogo from "@/assets/saludplus-logo.png";

const steps = [
  { label: "Responsable" },
  { label: "Dependiente" },
  { label: "Confirmación" },
];

const RegisterDependentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [form, setForm] = useState({
    respCedula: "",
    respNombre: "",
    respTelefono: "",
    respCorreo: "",
    depNombre: "",
    depFechaNacimiento: "",
    depSexo: "",
    depTipoSangre: "",
    depRelacion: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (currentStep === 0) {
      if (!form.respCedula.trim()) e.respCedula = "Ingresa tu cédula";
      else if (!/^\d{6,15}$/.test(form.respCedula.trim())) e.respCedula = "Formato inválido";
      if (!form.respNombre.trim()) e.respNombre = "Ingresa tu nombre completo";
      if (!form.respTelefono.trim()) e.respTelefono = "Ingresa tu teléfono";
      if (!form.respCorreo.trim()) e.respCorreo = "Ingresa tu correo";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.respCorreo)) e.respCorreo = "Correo inválido";
    } else if (currentStep === 1) {
      if (!form.depNombre.trim()) e.depNombre = "Ingresa el nombre del dependiente";
      if (!form.depFechaNacimiento) e.depFechaNacimiento = "Selecciona la fecha de nacimiento";
      if (!form.depSexo) e.depSexo = "Selecciona el sexo";
      if (!form.depTipoSangre) e.depTipoSangre = "Selecciona el tipo de sangre";
      if (!form.depRelacion) e.depRelacion = "Selecciona la relación";
    } else if (currentStep === 2) {
      if (!accepted) e.accepted = "Debes aceptar la responsabilidad";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
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
          <h2 className="text-xl font-bold text-foreground">¡Dependiente registrado!</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            El dependiente ha sido vinculado exitosamente a tu cuenta.
          </p>
          <Button onClick={() => navigate("/")} className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
            Ir al inicio de sesión
          </Button>
        </div>
      </div>
    );
  }

  const fieldClass = "mt-1.5";
  const errorClass = "text-xs text-destructive mt-1";

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <main className="flex-1 flex items-start justify-center px-6 pb-16 pt-2">
        <div className="w-full max-w-lg space-y-7">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-foreground tracking-tight" style={{ lineHeight: "1.2" }}>
              Registro de dependiente
            </h1>
            <p className="text-sm text-muted-foreground">
              Vincula un menor de edad o adulto mayor bajo tu cuidado
            </p>
          </div>

          <RegistrationStepper steps={steps} currentStep={currentStep} />

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            {/* Step 0: Responsable */}
            {currentStep === 0 && (
              <>
                <div>
                  <Label htmlFor="respCedula">Tu número de cédula</Label>
                  <Input id="respCedula" placeholder="Ej: 12345678" value={form.respCedula} onChange={(e) => update("respCedula", e.target.value)} className={fieldClass} />
                  {errors.respCedula && <p className={errorClass}>{errors.respCedula}</p>}
                </div>
                <div>
                  <Label htmlFor="respNombre">Nombre completo</Label>
                  <Input id="respNombre" placeholder="Ej: María García López" value={form.respNombre} onChange={(e) => update("respNombre", e.target.value)} className={fieldClass} />
                  {errors.respNombre && <p className={errorClass}>{errors.respNombre}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="respTelefono">Teléfono</Label>
                    <Input id="respTelefono" placeholder="Ej: 0412-1234567" value={form.respTelefono} onChange={(e) => update("respTelefono", e.target.value)} className={fieldClass} />
                    {errors.respTelefono && <p className={errorClass}>{errors.respTelefono}</p>}
                  </div>
                  <div>
                    <Label htmlFor="respCorreo">Correo electrónico</Label>
                    <Input id="respCorreo" type="email" placeholder="Ej: maria@correo.com" value={form.respCorreo} onChange={(e) => update("respCorreo", e.target.value)} className={fieldClass} />
                    {errors.respCorreo && <p className={errorClass}>{errors.respCorreo}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Dependiente */}
            {currentStep === 1 && (
              <>
                <div>
                  <Label htmlFor="depNombre">Nombre completo del dependiente</Label>
                  <Input id="depNombre" placeholder="Ej: Carlos García" value={form.depNombre} onChange={(e) => update("depNombre", e.target.value)} className={fieldClass} />
                  {errors.depNombre && <p className={errorClass}>{errors.depNombre}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="depFechaNacimiento">Fecha de nacimiento</Label>
                    <Input id="depFechaNacimiento" type="date" value={form.depFechaNacimiento} onChange={(e) => update("depFechaNacimiento", e.target.value)} className={fieldClass} />
                    {errors.depFechaNacimiento && <p className={errorClass}>{errors.depFechaNacimiento}</p>}
                  </div>
                  <div>
                    <Label>Sexo</Label>
                    <Select value={form.depSexo} onValueChange={(v) => update("depSexo", v)}>
                      <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecciona" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.depSexo && <p className={errorClass}>{errors.depSexo}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo de sangre</Label>
                    <Select value={form.depTipoSangre} onValueChange={(v) => update("depTipoSangre", v)}>
                      <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecciona" /></SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.depTipoSangre && <p className={errorClass}>{errors.depTipoSangre}</p>}
                  </div>
                  <div>
                    <Label>Relación</Label>
                    <Select value={form.depRelacion} onValueChange={(v) => update("depRelacion", v)}>
                      <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecciona" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hijo">Hijo/a</SelectItem>
                        <SelectItem value="madre">Madre</SelectItem>
                        <SelectItem value="padre">Padre</SelectItem>
                        <SelectItem value="abuelo">Abuelo/a</SelectItem>
                        <SelectItem value="tutor">Tutor legal</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.depRelacion && <p className={errorClass}>{errors.depRelacion}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Confirmación */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">
                    Al registrar un dependiente, declaras que eres el responsable legal o tutor
                    autorizado de esta persona y que la información proporcionada es verídica.
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Responsable:</span> {form.respNombre || "—"}</p>
                  <p><span className="text-muted-foreground">Dependiente:</span> {form.depNombre || "—"}</p>
                  <p><span className="text-muted-foreground">Relación:</span> {form.depRelacion || "—"}</p>
                </div>

                <div className="flex items-start gap-2.5">
                  <Checkbox
                    id="accept"
                    checked={accepted}
                    onCheckedChange={(v) => {
                      setAccepted(v === true);
                      setErrors((prev) => ({ ...prev, accepted: "" }));
                    }}
                    className="mt-0.5"
                  />
                  <label htmlFor="accept" className="text-sm text-foreground leading-relaxed cursor-pointer">
                    Confirmo que soy responsable legal del dependiente y que los datos son correctos.
                  </label>
                </div>
                {errors.accepted && <p className="text-xs text-destructive">{errors.accepted}</p>}
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

export default RegisterDependentPage;
