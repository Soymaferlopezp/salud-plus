import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
}

interface RegistrationStepperProps {
  steps: Step[];
  currentStep: number;
}

const RegistrationStepper = ({ steps, currentStep }: RegistrationStepperProps) => {
  return (
    <div className="flex items-center gap-1 w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-center gap-1 flex-1 last:flex-initial">
            <div className="flex items-center gap-2.5 min-w-fit">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-accent text-accent-foreground ring-2 ring-accent/30",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-sm hidden sm:inline whitespace-nowrap transition-colors",
                  isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 mx-2 transition-colors duration-300",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RegistrationStepper;
