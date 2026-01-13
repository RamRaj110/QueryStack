"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4">
      <Image
        src="/somethingWrongImage.png"
        alt="Something went wrong"
        width={300}
        height={220}
        className="object-contain"
        priority
      />

      <h1 className="mt-8 text-3xl font-bold text-foreground">
        Something Went Wrong
      </h1>

      <p className="mt-4 max-w-md text-center text-muted-foreground">
        We encountered an unexpected error. Don&apos;t worry, even the best code
        has a bad day sometimes.
      </p>

      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          onClick={reset}
          className="min-h-[46px] bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
        >
          Try Again
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => (window.location.href = "/")}
          className="min-h-[46px] px-6 py-3"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
