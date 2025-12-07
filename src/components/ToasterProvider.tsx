"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1a1a2e",
          color: "#fff",
          border: "2px solid #00b5cc",
          borderRadius: "8px",
          fontWeight: "600",
        },
        success: {
          iconTheme: {
            primary: "#97ce4c",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff6b6b",
            secondary: "#fff",
          },
          style: {
            border: "2px solid #ff6b6b",
          },
        },
      }}
    />
  );
}
