"use client";

import { Toaster } from "react-hot-toast";
import { type ReactNode } from "react";

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            background: "hsl(240 5% 6% / 0.8)",
            color: "hsl(0 0% 95%)",
            border: "1px solid hsl(240 5% 16% / 0.5)",
            backdropFilter: "blur(16px)",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "hsl(160 84% 39%)",
              secondary: "hsl(0 0% 95%)",
            },
          },
          error: {
            iconTheme: {
              primary: "hsl(0 84% 60%)",
              secondary: "hsl(0 0% 95%)",
            },
          },
        }}
      />
    </>
  );
}
