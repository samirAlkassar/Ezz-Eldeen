"use client"

import * as React from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import { Check, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image";
import i18n from "@/i18n/i18n";

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
  duration?: number;
  position?: ToastPosition;
  icon?: React.ReactNode;
  image?: string;
  actionButton?: {
    text: string,
    onClick: ()=>void
  }
};

const toastVariants = cva(
  "pointer-events-auto relative flex w-full max-w-sm min-w-sm items-center gap-6 rounded-xl p-2 md:p-4 shadow-2xl transition-all font-medium backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-card/75 text-gray-900",
        success: "bg-card/75 text-white shadow-emerald-500/20",
        warning: "bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-amber-500/20",
        error: "bg-red-200/75 text-white shadow-card",
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
              "fixed z-[9999] flex w-full max-w-[15rem] md:max-w-sm flex-col gap-2 pointer-events-none",
              i18n.language === "ar" ? positionClasses["bottom-left"] : positionClasses[position]
            )}>
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
      <div className={twMerge(toastVariants({ variant: toast.variant }), toast.actionButton ? "cursor-pointer active:scale-95 duration-75 transition-all ease-in" : "")} onClick={toast?.actionButton?.onClick}>
        <div className="flex-1 flex gap-2">
          {toast.image ? <div className="relative min-h-20 min-w-20 max-w-20 max-h-20 border-1 border-gray-100 rounded-md">
            <Image src={toast.image ?? "/images/placeholder.jpg"} alt={"product image"} fill className="absolute object-cover rounded-md"/>
            <CheckMark toast={toast}/>
          </div>: 
          <div className={twMerge("min-h-20 min-w-20 max-w-20 flex items-center justify-center rounded-md text-text relative", 
            toast.variant === "default" ? "bg-card" : 
            toast.variant  === "success" ? "bg-card" : 
            toast.variant === "error" ? "bg-red-300/75 text-red-400" : "")}>
            <span className="md:scale-125">{toast.icon}</span>
          <CheckMark toast={toast}/>
          </div>
          }
          <div>
              {toast.title && (
                <p className="text-sm md:text-base font-medium leading-none text-text">{toast.title}</p>
              )}
            {toast.description && (
              <p className="mt-0.5 text-sm opacity-80 line-clamp-2 text-text-muted">{toast.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {toast.actionButton && 
            <button 
              onClick={toast.actionButton.onClick}
              className="rounded-md px-1 py-0.5 md:px-2 md:py-1 opacity-80 transition hover:opacity-100 cursor-pointer bg-card mx-1">
                {toast.actionButton.text}
            </button>}
          <button
            onClick={() => removeToast(toast.id)}
            className="rounded-md p-1 md:p-2 opacity-80 transition hover:opacity-100 cursor-pointer hover:bg-card text-text">
            <X size={18}/>
          </button>
        </div>

      </div>
    </motion.div>
  );
}


const CheckMark = ({ toast }: { toast: Toast }) => {
  return (
    <>
      {toast.variant === "success" &&
      <span 
        className="absolute -top-1 -left-1 bg-green-500 text-white rounded-full h-5 w-5 flex items-center justify-center border-1 border-white">
          {<Check size={16}/>}
      </span>
    }
    </>
  )
}