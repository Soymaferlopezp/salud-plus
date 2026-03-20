import LoginForm from "@/components/LoginForm";
import saludplusLogo from "@/assets/saludplus-logo.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="relative lg:w-1/2 bg-primary overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:py-0">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/[0.03]" />
          <div className="absolute -bottom-48 -right-24 w-[500px] h-[500px] rounded-full bg-white/[0.02]" />
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-[0.07]">
            <HeartbeatLine />
          </div>
        </div>

        <div className="relative z-10 max-w-md text-center lg:text-left space-y-6">
          <img
            src={saludplusLogo}
            alt="Salud Plus"
            className="h-14 lg:h-16 object-contain mx-auto lg:mx-0"
          />
          <h1
            className="text-primary-foreground text-3xl lg:text-4xl font-bold tracking-tight"
            style={{ lineHeight: "1.15" }}
          >
            Gestiona tu salud de forma rápida y segura
          </h1>
          <p className="text-primary-foreground/70 text-base lg:text-lg leading-relaxed max-w-sm">
            Consulta tus citas, resultados y autorizaciones médicas desde un solo lugar.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-background px-6 py-12 lg:py-0">
        <LoginForm />
      </div>
    </div>
  );
};

/** Decorative SVG heartbeat line */
const HeartbeatLine = () => (
  <svg
    viewBox="0 0 1200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    preserveAspectRatio="none"
  >
    <path
      d="M0 60 H400 L420 60 L440 20 L460 100 L480 40 L500 80 L520 60 H800 L820 60 L840 30 L860 90 L880 50 L900 70 L920 60 H1200"
      stroke="currentColor"
      strokeWidth="2"
      className="text-primary-foreground"
    />
  </svg>
);

export default LoginPage;
