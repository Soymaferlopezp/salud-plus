import LoginForm from "@/components/LoginForm";
import saludplusLogo from "@/assets/saludplus-logo.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel — Brand */}
      <div
        className="relative lg:w-[48%] flex flex-col items-center justify-center px-8 py-14 lg:py-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, hsl(222 47% 14%) 0%, hsl(222 47% 11%) 40%, hsl(224 58% 18%) 100%)",
        }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 70%, hsla(217, 91%, 60%, 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-md text-center lg:text-left space-y-5">
          <img
            src={saludplusLogo}
            alt="Salud Plus"
            className="h-12 lg:h-14 object-contain mx-auto lg:mx-0"
          />
          <h1
            className="text-white text-[1.75rem] lg:text-[2rem] font-bold tracking-tight"
            style={{ lineHeight: "1.2" }}
          >
            Gestiona tu salud de forma rápida y segura
          </h1>
          <p className="text-white/60 text-[0.95rem] lg:text-base leading-relaxed max-w-sm">
            Consulta tus citas, resultados y autorizaciones médicas desde un
            solo lugar.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center bg-background px-6 py-14 lg:py-0">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
