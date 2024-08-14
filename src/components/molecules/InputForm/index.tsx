import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog.tsx";

interface InputFormProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function InputForm({ title, description, children }: InputFormProps) {
  return (
    <div className="mt-4">
      <div className="py-2">
        <DialogTitle className={`mb-2`}>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </div>
      {children}
    </div>
  );
}
