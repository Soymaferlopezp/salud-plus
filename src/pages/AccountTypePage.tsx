import { useNavigate } from "react-router-dom";
import { User, Stethoscope, ShieldCheck, Users } from "lucide-react";
import saludplusLogo from "@/assets/saludplus-logo.png";

const accountTypes = [
  {
    id: "paciente",
    icon: User,
    title: "Paciente",
    description: "Agenda citas y consulta tu información médica.",
    route: "/registro/paciente",
  },
  {
    id: "doctor",
    icon: Stethoscope,
    title: "Doctor",
    description: "Gestiona tu agenda y accede a tus pacientes.",
    route: "/registro/doctor",
  },
  {
    id: "administrativo",
    icon: ShieldCheck,
    title: "Personal administrativo",
    description: "Administra citas, pacientes y operaciones del centro médico.",
    route: "/registro/administrativo",
  },
  {
    id: "dependiente",
    icon: Users,
    title: "Registrar dependiente",
    description: "Agrega un menor de edad o adulto mayor bajo tu cuidado.",
    route: "/registro/dependiente",
  },
];

const AccountTypePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
          <img src={saludplusLogo} alt="Salud Plus" className="h-8 object-contain" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Ya tengo cuenta
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-2">
            <h1
              className="text-2xl font-bold text-foreground tracking-tight"
              style={{ lineHeight: "1.2" }}
            >
              Crea tu cuenta
            </h1>
            <p className="text-muted-foreground text-[0.95rem]">
              Selecciona el tipo de registro que deseas realizar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accountTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => navigate(type.route)}
                  className="group relative flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/12">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[0.95rem] font-semibold text-foreground">
                      {type.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground/70">
            Salud Plus © {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </div>
  );
};

export default AccountTypePage;
