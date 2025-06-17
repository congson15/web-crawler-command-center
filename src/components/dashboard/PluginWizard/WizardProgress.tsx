
import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function WizardProgress({ currentStep, totalSteps, steps }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index < currentStep
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : index === currentStep
                  ? "bg-blue-500 text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium transition-colors ${
                  index <= currentStep ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step}
              </p>
            </div>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-20 h-0.5 mx-4 transition-colors ${
                index < currentStep ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
