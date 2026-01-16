import SocialAuth from "@/components/forms/SocialAuth";
import React from "react";
import Image from "next/image";
import {
  Code2,
  Sparkles,
  Users,
  Trophy,
  MessageCircle,
  Zap,
} from "lucide-react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full bg-background">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-indigo-500/10 p-12">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full blur-xl" />
                <div className="relative">
                  <Image
                    className="rounded-full object-cover"
                    src="/logo.webp"
                    alt="Logo"
                    width={74}
                    height={74}
                  />
                </div>
              </div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">
                Query
                <span className="bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                  Stack
                </span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground font-medium max-w-md">
              Where developers connect, learn, and grow together 🚀
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 max-w-xl">
            {/* Feature 1 */}
            <div className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-primary/30">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <MessageCircle size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Ask & Answer Questions 💬
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get help from thousands of experienced developers worldwide
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-primary/30"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Users size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Join the Community 🌟
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect with passionate developers and build your network
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-primary/30"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Trophy size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Earn Reputation 🏆
                </h3>
                <p className="text-sm text-muted-foreground">
                  Build your profile and showcase your expertise to the world
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-primary/30"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Zap size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Level Up Your Skills ⚡
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn from real-world problems and expert solutions
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stats/Social Proof */}
          <div className="flex items-center gap-8 pt-8 border-t border-border/40">
            <div>
              <p className="text-3xl font-black text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Developers</p>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">100K+</p>
              <p className="text-sm text-muted-foreground">Answers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex w-full lg:w-1/2 xl:w-2/5 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right duration-700">
          {/* Mobile Logo (only visible on small screens) */}
          <div className="lg:hidden flex flex-col items-center space-y-3 text-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full blur-lg" />
              <div className="relative rounded-full  p-1">
                <Image
                  className="rounded-full object-cover"
                  src="/logo.webp"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Query
              <span className="bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                Stack
              </span>
            </h1>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {children}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
            </div>

            {/* Social Auth */}
            <SocialAuth />
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="font-semibold text-primary hover:underline transition-colors duration-300"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-semibold text-primary hover:underline transition-colors duration-300"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
