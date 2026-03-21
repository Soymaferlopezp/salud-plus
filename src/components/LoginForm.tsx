import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Loader2, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = (value: string) => {
    if (!value.trim()) return "Ingresa tu número de cédula";
    if (!/^\d{6,15}$/.test(value.replace(/[^0-9]/g, "")))
      return "Número de cédula inválido";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(cedula);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* Auxiliary text */}
      <p className="text-muted-foreground text-xs tracking-wide uppercase font-medium text-center mb-6">
        Acceso para pacientes, doctores y personal autorizado
      </p>

      <div className="bg-card rounded-2xl shadow-[0_2px_24px_hsl(222_47%_11%/0.07)] p-8 md:p-10">
        <h2
          className="text-[1.4rem] font-semibold text-foreground tracking-tight"
          style={{ lineHeight: "1.2" }}
        >
          Accede a tu cuenta
        </h2>
        <p className="text-muted-foreground text-sm mt-1.5 mb-8 leading-relaxed">
          Si ya estás registrado, ingresa tu número de cédula para continuar.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="cedula"
              className="text-sm font-medium text-foreground"
            >
              Número de cédula
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground/60 pointer-events-none" />
              <Input
                id="cedula"
                type="text"
                inputMode="numeric"
                placeholder="Ej: V-12345678"
                value={cedula}
                onChange={(e) => {
                  setCedula(e.target.value);
                  if (error) setError("");
                }}
                className={`h-12 pl-11 text-base rounded-lg border bg-background transition-colors ${
                  error
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-input focus-visible:ring-ring"
                }`}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                error ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-destructive text-sm mt-1">{error}</p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.97] transition-all duration-150 gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Accediendo…
              </>
            ) : (
              <>
                Acceder
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs">o</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Secondary actions */}
        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-input text-sm font-medium text-foreground hover:bg-muted/60 active:scale-[0.98] transition-all duration-150"
          >
            <UserPlus className="h-4 w-4" />
            Crear cuenta
          </a>
          <a
            href="#"
            className="block text-center text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Registrar dependiente
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        Salud Plus © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default LoginForm;
