import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-seoptimizer-primary/30 to-seoptimizer-dark/40 h-screen w-full">
      {children}
    </div>
  );
} 