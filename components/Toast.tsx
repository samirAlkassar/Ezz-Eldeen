"use client"
// Toast system inspired by shadcn/ui
// Drop this into your project and wrap <ToastProvider /> once (usually in layout.tsx)

import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  duration?: number; // ms
  position?: ToastPosition;
  icon?: React.ReactNode
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const toastVariants = cva(
  "pointer-events-auto relative flex w-full max-w-sm items-start gap-3 rounded-lg p-5 shadow-2xl transition-all font-medium backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white/95 text-gray-900",
        success: "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-emerald-500/20",
        warning: "bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-amber-500/20",
        error: "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-500/20",
        info: "bg-gradient-to-br from-sky-400 to-blue-400 text-white shadow-blue-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const positionClasses: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

/* -------------------------------------------------------------------------- */
/* Store (shadcn-style, no context rerenders everywhere)                        */
/* -------------------------------------------------------------------------- */

let listeners: Array<(toasts: Toast[]) => void> = [];
let memoryState: Toast[] = [];

function emitChange() {
  listeners.forEach((l) => l(memoryState));
}

function addToast(toast: Toast) {
  memoryState = [...memoryState, toast];
  emitChange();

  if (toast.duration !== Infinity) {
    setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration ?? 4000);
  }
}

function removeToast(id: string) {
  memoryState = memoryState.filter((t) => t.id !== id);
  emitChange();
}

export function useToast() {
  return {
    toast: (toast: Omit<Toast, "id">) =>
      addToast({
        id: crypto.randomUUID(),
        position: "top-right",
        ...toast,
      }),
    dismiss: (id: string) => removeToast(id),
  };
}

/* -------------------------------------------------------------------------- */
/* Provider / View                                                             */
/* -------------------------------------------------------------------------- */

export function ToastProvider() {
  const [toasts, setToasts] = React.useState<Toast[]>(memoryState);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {(Object.keys(positionClasses) as ToastPosition[]).map((position) => {
        const positionToasts = toasts.filter(
          (t) => (t.position ?? "top-right") === position
        );

        return (
          <div
            key={position}
            className={twMerge(
              "fixed z-[9999] flex w-full max-w-sm flex-col gap-2 pointer-events-none",
              positionClasses[position]
            )}
          >
            <AnimatePresence mode="popLayout">
              {positionToasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
              ))}
            </AnimatePresence>
          </div>
        );
      })}
    </>,
    document.body
  );
}


function ToastItem({ toast }: { toast: Toast }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.2, ease: "easeOut" }}>
      <div className={toastVariants({ variant: toast.variant })}>
        <div className="flex-1">
          <div className="flex gap-2">
            {toast.icon}
            {toast.title && (
              <p className="text-xl font-semibold leading-none">{toast.title}</p>
            )}
          </div>

          {toast.description && (
            <p className="mt-1 text-base opacity-80 min-w-[19rem]">{toast.description}</p>
          )}
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="rounded-md p-2 opacity-80 transition hover:opacity-100 cursor-pointer"
        >
          <X size={18}/>
        </button>
      </div>
    </motion.div>
  );
}
