"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageSelector } from "@/components/language-selector";
import { SocialLoginButtons } from "@/components/social-login-buttons";
import { OtpModal } from "@/components/otp-modal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { MoveUpRight, SunMoon } from "lucide-react";

export default function SignupPage() {
  const { signup, isLoading } = useAuth();
  const { t, getLanguageFont } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtpModal(true);
  };

  const handleOtpVerify = async (otp: string) => {
    console.log("OTP verified:", otp);
    const success = await signup(
      formData.name,
      formData.email,
      formData.phone,
      formData.password,
    );

    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-2 items-center">
        <Button
          className="dark:bg-slate-950 bg-gray-100 text-black dark:text-white border-2 border-gray-500/25 hover:bg-black/25 dark:hover:bg-white/25 transition-colors rounded py-0 h-8"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
        >
          <SunMoon />
        </Button>
        <LanguageSelector />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-gray-200 dark:border-slate-800 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <p
            className={cn(
              "text-sm text-gray-600 dark:text-gray-100 mb-1",
              getLanguageFont(t.welcome),
            )}
          >
            <span className="text-teal-600">{t.siteName}</span> {t.welcome}
          </p>
          <h1
            className={cn(
              "text-2xl font-semibold text-gray-900 dark:text-gray-200",
              getLanguageFont(t.createAccount),
            )}
          >
            {t.createAccount}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-2">
          <div>
            <label
              className={cn(
                "block text-sm font-medium text-gray-700 dark:text-gray-100 mb-0.5",
                getLanguageFont(t.enterName),
              )}
            >
              {t.enterName}
            </label>
            <Input
              type="text"
              name="name"
              placeholder={t.fullNamePlaceholder}
              value={formData.name}
              onChange={handleInputChange}
              className={cn(
                "h-12 border-gray-300 dark:border-gray-800 rounded",
                getLanguageFont(t.fullNamePlaceholder),
              )}
              required
            />
          </div>

          <div>
            <label
              className={cn(
                "block text-sm font-medium text-gray-700 dark:text-gray-100 mb-0.5",
                getLanguageFont(t.enterEmail),
              )}
            >
              {t.enterEmail}
            </label>
            <Input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                "h-12 border-gray-300 dark:border-gray-800 rounded",
                getLanguageFont(t.emailPlaceholder),
              )}
              required
            />
          </div>

          <div>
            <label
              className={cn(
                "block text-sm font-medium text-gray-700 dark:text-gray-100 mb-0.5",
                getLanguageFont(t.enterPhone),
              )}
            >
              {t.enterPhone}
            </label>
            <Input
              type="tel"
              name="phone"
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={handleInputChange}
              className={cn(
                "h-12 border-gray-300 dark:border-gray-800 rounded",
                getLanguageFont(t.phonePlaceholder),
              )}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded font-medium",
              getLanguageFont(t.verify),
            )}
          >
            {t.verify}
          </Button>
        </form>

        <div className="text-center mb-6">
          <Link
            href="/login"
            className={cn(
              "text-teal-600 hover:text-teal-800 dark:hover:text-teal-400 text-sm font-medium",
              getLanguageFont(t.alreadyHaveAccount),
            )}
          >
            {t.alreadyHaveAccount} →
          </Link>
        </div>

        <div className="relative mb-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={cn(
                "px-4 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-300",
                getLanguageFont(t.orSignUp),
              )}
            >
              {t.orSignUp}
            </span>
          </div>
        </div>

        <SocialLoginButtons isSignup={true} />
      </div>

      <AnimatePresence mode="wait">
        {showOtpModal && (
          <OtpModal
            isOpen={showOtpModal}
            onClose={() => setShowOtpModal(false)}
            onVerify={handleOtpVerify}
            type="both"
            contact={formData.email}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
