"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

interface SocialLoginButtonsProps {
  isSignup?: boolean;
}

export function SocialLoginButtons({
  isSignup = false,
}: SocialLoginButtonsProps) {
  const { t, getLanguageFont } = useLanguage();

  const handleSocialLogin = (provider: string) => {
    // Placeholder for social login integration
    console.log(`${isSignup ? "Sign up" : "Login"} with ${provider}`);
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full justify-center mx-auto gap-3 h-12 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded hover:bg-gray-100 hover:border-teal-600 dark:hover:bg-slate-700 dark:hover:border-teal-600 transition-colors"
        onClick={() => handleSocialLogin("Google")}
      >
        <span className="flex gap-3 items-center justify-start">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span
            className={cn(
              "text-gray-700 dark:text-gray-100 font-medium w-36 text-left",
              getLanguageFont(isSignup ? t.signUpGoogle : t.loginGoogle),
            )}
          >
            {isSignup ? t.signUpGoogle : t.loginGoogle}
          </span>
        </span>
      </Button>

      <Button
        variant="outline"
        className="w-full justify-center gap-3 h-12 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded hover:bg-gray-100 hover:border-teal-600 dark:hover:bg-slate-700 dark:hover:border-teal-600 transition-colors"
        onClick={() => handleSocialLogin("Meta")}
      >
        <span className="flex gap-3 items-center justify-start">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#1877F2"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
          <span
            className={cn(
              "text-gray-700 dark:text-gray-100 font-medium w-36 text-left",
              getLanguageFont(isSignup ? t.signUpMeta : t.loginMeta),
            )}
          >
            {isSignup ? t.signUpMeta : t.loginMeta}
          </span>
        </span>
      </Button>

      {isSignup ? (
        <Button
          variant="outline"
          className="w-full justify-center gap-3 h-12 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded hover:bg-gray-100 hover:border-teal-600 dark:hover:bg-slate-700 dark:hover:border-teal-600 transition-colors"
          onClick={() => handleSocialLogin("Microsoft")}
        >
          <span className="flex gap-3 items-center justify-start">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#F25022" d="M1 1h10v10H1z" />
              <path fill="#00A4EF" d="M13 1h10v10H13z" />
              <path fill="#7FBA00" d="M1 13h10v10H1z" />
              <path fill="#FFB900" d="M13 13h10v10H13z" />
            </svg>
            <span
              className={cn(
                "text-gray-700 dark:text-gray-100 font-medium w-36 text-left",
                getLanguageFont(t.signUpMicrosoft),
              )}
            >
              {t.signUpMicrosoft}
            </span>
          </span>
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full justify-center gap-3 h-12 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded hover:bg-gray-100 hover:border-teal-600 dark:hover:bg-slate-700 dark:hover:border-teal-600 transition-colors"
          onClick={() => handleSocialLogin("Apple")}
        >
          <span className="flex gap-3 items-center justify-start">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-black dark:fill-white"
            >
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
              <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            <span
              className={cn(
                "text-gray-700 dark:text-gray-100 font-medium w-36 text-left",
                getLanguageFont(t.loginApple),
              )}
            >
              {t.loginApple}
            </span>
          </span>
        </Button>
      )}
    </div>
  );
}
