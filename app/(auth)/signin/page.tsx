"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { LogIn, ArrowRight } from "lucide-react";

const SignInPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 hover:scale-110">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Welcome Back! 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Continue your coding journey
            </p>
          </div>
        </div>
      </div>

      {/* Quick Benefits */}
      <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <span className="text-lg">💾</span>
            </div>
            <span className="text-sm font-medium text-foreground/90">
              Access your saved questions
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <span className="text-lg">📊</span>
            </div>
            <span className="text-sm font-medium text-foreground/90">
              Track your contributions
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
              <span className="text-lg">🤝</span>
            </div>
            <span className="text-sm font-medium text-foreground/90">
              Connect with developers
            </span>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <AuthForm
        formType="SIGNIN"
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={signInWithCredentials}
      />

      {/* Extra CTA */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
        <p className="text-sm text-foreground/80">
          New to Query Stack?{" "}
          <span className="font-bold text-primary">Join thousands</span> of
          developers today! ✨
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
