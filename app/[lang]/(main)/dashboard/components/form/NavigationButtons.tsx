import { ChevronLeft } from "lucide-react";

type NavigationButtons = {
    currentStep: number
    setCurrentStep: (value: number) => void, 
    setRedAlert: (value: boolean) => void, 
    onClose: () => void, 
    validateStep: (step: number) => boolean, 
    setCompletedSteps: (value: (prev: {[key: number]: boolean}) => {[key: number]: boolean}) => void, 
    saving: boolean, 
    isEdit: boolean
}

const NavigationButtons = ({currentStep, setCurrentStep, setRedAlert, onClose, validateStep, setCompletedSteps, saving, isEdit}: NavigationButtons) => {
    return (
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
                type="button"
                onClick={() => {
                    if (currentStep > 1) {
                        setCurrentStep(currentStep - 1);
                        setRedAlert(false);
                    } else {
                        onClose();
                    }
                }}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-150 cursor-pointer"
            >
                {currentStep > 1 && <ChevronLeft size={18} />}
                {currentStep === 1 ? "Cancel" : "Previous"}
            </button>

            {currentStep < 3 ? (
                <div
                    onClick={() => {
                        if (!validateStep(currentStep)) {
                            setRedAlert(true);
                        } else {
                            setCompletedSteps(prev => ({ ...prev, [currentStep]: true }));
                            setCurrentStep(currentStep + 1);
                            setRedAlert(false);
                        }
                    }}
                    className="px-4 md:px-6 py-1.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 cursor-pointer">
                    Next Step
                </div>
            ) : (
                <button
                    type="submit"
                    disabled={saving}
                    className="px-4 md:px-6 py-1.5 md:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
                >
                    {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
                </button>
            )}
        </div>
    )
};

export default NavigationButtons;