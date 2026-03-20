import { useState } from "react";
import { User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = (value: string) => {
    if (!value.trim()) return "Ingresa tu número de cédula";
    if (!/^\d{6,15}$/.test(value.trim())) return "Número de cédula inválido";
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
    // Simulated login
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-xl shadow-[0_4px_24px_hsl(222_47%_11%/0.08)] p-8 md:p-10">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-1">
          Bienvenido
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          Ingresa tu cédula para acceder a tu cuenta
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="cedula" className="text-sm font-medium text-foreground">
              Número de cédula
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground pointer-events-none" />
              <Input
                id="cedula"
                type="text"
                inputMode="numeric"
                placeholder="Ej: 40212345678"
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
            className="w-full h-12 rounded-lg text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98] transition-all duration-150"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Accediendo...
              </>
            ) : (
              "Acceder"
            )}
          </Button>
        </form>

        <div className="mt-8 space-y-3 text-center text-sm">
          <p className="text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <a
              href="#"
              className="text-foreground font-medium underline underline-offset-4 hover:text-accent transition-colors"
            >
              Regístrate
            </a>
          </p>
          <a
            href="#"
            className="inline-block text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Registro de dependientes
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
