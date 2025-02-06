import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const steps = [
  { id: "basic", label: "Basic Details" },
  { id: "categorization", label: "Categorization" },
  { id: "specifications", label: "Specifications" },
  { id: "audience", label: "Target Audience" },
  { id: "status", label: "Status & Visibility" },
  { id: "seo", label: "SEO" },
  { id: "baseImage", label: "Base Image" },
  { id: "variants", label: "Variants" },
];

export function FormNavigation({ currentStep, onStepChange, form }) {
  const handleStepChange = async (stepId) => {
    let isValid = true;
    if (currentStep === "basic") {
      isValid = await form.trigger(["name", "description"]);
    } else if (currentStep === "categorization") {
      isValid = await form.trigger(["category", "shop"]);
    }
    if (isValid) {
      onStepChange(stepId);
    }
  };

  return (
    <nav className="mb-8">
      <ol className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {steps.map((step, index) => (
          <li key={step.id}>
            <Button
              variant={currentStep === step.id ? "default" : "outline"}
              className="w-full justify-start shadow-2xl"
              onClick={() => handleStepChange(step.id)}
            >
              <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary">
                {index < steps.findIndex((s) => s.id === currentStep) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </span>
              <span className="truncate">{step.label}</span>
            </Button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

FormNavigation.propTypes = {
  currentStep: PropTypes.string.isRequired,
  onStepChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};
