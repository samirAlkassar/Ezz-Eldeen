import { motion } from "motion/react";
import React from "react";
import { twMerge } from "tailwind-merge";

type FormNavigationProps = {
    completedSteps: Record<number, boolean>, 
    setCurrentStep: (value: number) => void, 
    setRedAlert: (value: boolean) => void, 
    currentStep: number
}

const FormNavigation = ({completedSteps, setCurrentStep, setRedAlert, currentStep}: FormNavigationProps) => {
    const handleClick = (step: number) => {
        if (completedSteps[step - 1] || step === 1) {
            setCurrentStep(step);
            setRedAlert(false);
        }
    };

    return (
        <div className="w-full px-4 md:px-6 py-4 md:py-4 pb-8 flex items-center justify-center border-b border-slate-100">
            {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                    <div
                        onClick={() => handleClick(step)}
                        className={twMerge(
                            "relative rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center border-2 justify-center font-semibold transition-all duration-200",
                            currentStep === step
                                ? "bg-blue-500 text-white border-blue-500 scale-110"
                                : completedSteps[step]
                                    ? "bg-green-500 text-white border-green-500 cursor-pointer hover:scale-105"
                                    : "bg-white border-slate-300 text-slate-400 cursor-default"
                        )}>
                        {completedSteps[step] ? (
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </motion.svg>
                        ) : (
                            step
                        )}
                        <span className={twMerge(
                            "absolute -bottom-5 md:-bottom-6 text-xs md:text-base font-medium whitespace-nowrap",
                            currentStep === step ? "text-blue-600" : "text-slate-400")}>
                            {step === 1 ? "Basic Info" : step === 2 ? "Pricing" : "Review"}
                        </span>
                    </div>
                    {step !== 3 && (
                        <div className={twMerge(
                            "h-0.5 w-24 rounded-full transition-all duration-300",
                            completedSteps[step] ? "bg-green-500" : "bg-slate-200")}/>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
};

export default FormNavigation;