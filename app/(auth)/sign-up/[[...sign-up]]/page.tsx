import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mb-8">
        <Image 
          src="/logo.svg" 
          alt="Seoptimizer Logo" 
          width={150} 
          height={40} 
          className="mx-auto"
        />
      </div>
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="p-6">
          <h2 className="mb-6 text-center text-2xl font-bold text-seoptimizer-dark">
            Create your Seoptimizer account
          </h2>
          <SignUp
            path="/sign-up"
            routing="path"
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-seoptimizer-primary hover:bg-seoptimizer-secondary text-white",
                formFieldInput: 
                  "border-gray-300 focus:border-seoptimizer-primary focus:ring-seoptimizer-primary",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
} 