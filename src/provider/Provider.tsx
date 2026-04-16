import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default Provider;
