import type { ReactNode } from "react";
import { BackButton } from "./BackButton";

type AuthShellProps = {
  children: ReactNode;
  variant: "login" | "signup";
};

const content = {
  login: {
    eyebrow: "A clearer day starts here",
    title: "Pick up right where your focus begins.",
    description:
      "Sign in to organize your tasks, get helpful AI support, and keep your momentum going.",
    footer: "One thoughtful step at a time.",
  },
  signup: {
    eyebrow: "A fresh start, made simple",
    title: "Make space for the work that matters.",
    description:
      "Create your account and bring your plans, priorities, and next steps together in one place.",
    footer: "Good things get done one step at a time.",
  },
} as const;

export function AuthShell({ children, variant }: AuthShellProps) {
  const copy = content[variant];

  return (
    <main className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-3 py-8 dark:from-violet-950/30 dark:via-gray-950 dark:to-indigo-950/20 sm:min-h-[calc(100dvh-5rem)] sm:px-4 sm:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-800/20" />
      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-violet-950/10 dark:border-gray-800 dark:bg-gray-900 sm:rounded-3xl lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-700 to-indigo-800 p-10 text-white lg:flex">
          <div aria-hidden="true" className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[48px] border-white/10" />
          <div className="relative">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl" aria-hidden="true">✦</span>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-violet-200">{copy.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">{copy.title}</h2>
            <p className="mt-4 leading-7 text-violet-100">{copy.description}</p>
            {variant === "signup" && (
              <ul className="mt-8 space-y-4 text-sm text-violet-50">
                <li className="flex gap-3"><span aria-hidden="true" className="font-bold">✓</span> Organize your tasks in one clear view</li>
                <li className="flex gap-3"><span aria-hidden="true" className="font-bold">✓</span> Get a hand from AI when you need it</li>
                <li className="flex gap-3"><span aria-hidden="true" className="font-bold">✓</span> Celebrate progress, big or small</li>
              </ul>
            )}
          </div>
          <p className="relative text-sm text-violet-200">{copy.footer}</p>
        </aside>
        <div className="flex w-full min-w-0 flex-col">
          <div className="px-4 pt-4 sm:px-8 sm:pt-6">
            <BackButton />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
