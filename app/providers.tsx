'use client';

import { ReactNode } from "react";
import { ConvexProvider } from "convex/react";
import { convex } from "@/convex/cliente"; // Importar la instancia existente

interface ConvexClientProviderProps {
  children: ReactNode;
}

export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}