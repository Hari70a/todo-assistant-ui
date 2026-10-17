import { Link } from "react-router";

const features = [
  {
    number: "01",
    title: "Make a clear plan",
    description: "Turn everything on your mind into a simple, organized to-do list.",
  },
  {
    number: "02",
    title: "Find your next step",
    description: "Get a little help from AI when you need to prioritize or get unstuck.",
  },
  {
    number: "03",
    title: "See your progress",
    description: "Keep momentum going as you make steady progress, one task at a time.",
  },
];

export function Welcome() {
  return (
    <main className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white px-4 py-10 dark:from-violet-950/30 dark:via-gray-950 dark:to-gray-950 sm:min-h-[calc(100dvh-5rem)] sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-36 -z-10 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl dark:bg-violet-800/20"
      />
      <div className="mx-auto max-w-6xl">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-violet-800 shadow-sm dark:border-violet-800 dark:bg-gray-900/80 dark:text-violet-200">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              Your calmer way to get things done
            </p>
            <h1 className="max-w-2xl text-[2rem] font-bold leading-[1.15] tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
              Make room for
              <span className="block text-violet-700 dark:text-violet-300">what matters.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
              Bring your tasks into one clear space. Plan your day, get helpful
              AI support, and turn a busy list into your next small win.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-violet-700 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-700/20 transition hover:-translate-y-0.5 hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400"
              >
                Get started
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-violet-700 dark:hover:bg-gray-800"
              >
                Log in
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Simple to start. Ready when you are.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-violet-200/70 via-fuchsia-100/60 to-sky-100/70 blur-2xl dark:from-violet-900/30 dark:via-fuchsia-900/20 dark:to-sky-900/20"
            />
            <div className="relative rounded-3xl border border-white/80 bg-white/90 p-5 shadow-2xl shadow-violet-900/10 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-violet-700 dark:text-violet-300">YOUR DAY, IN FOCUS</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">A little progress adds up.</h2>
                </div>
                <span className="rounded-xl bg-violet-100 px-3 py-2 text-sm font-semibold text-violet-800 dark:bg-violet-900/50 dark:text-violet-200">Today</span>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-600 p-5 text-white shadow-lg shadow-violet-700/20">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">You’re building momentum</p>
                  <span aria-hidden="true" className="text-xl">✦</span>
                </div>
                <p className="mt-1 text-sm text-violet-100">Small steps count. Keep going!</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/25">
                  <div className="h-full w-2/3 rounded-full bg-white" />
                </div>
                <p className="mt-2 text-right text-xs text-violet-100">2 of 3 tasks complete</p>
              </div>

              <ul className="mt-5 space-y-3">
                <li className="flex items-center gap-3 rounded-xl bg-gray-50 p-3.5 dark:bg-gray-800/80">
                  <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">✓</span>
                  <span className="flex-1 text-sm font-medium text-gray-500 line-through dark:text-gray-400">Plan the week ahead</span>
                  <span className="text-xs text-gray-400">Done</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/70 p-3.5 dark:border-violet-900 dark:bg-violet-950/40">
                  <span aria-hidden="true" className="h-6 w-6 rounded-full border-2 border-violet-400 dark:border-violet-500" />
                  <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">Focus on your top priority</span>
                  <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-800 dark:bg-violet-900/70 dark:text-violet-200">Next up</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-gray-50 p-3.5 dark:bg-gray-800/80">
                  <span aria-hidden="true" className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                  <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">Take a well-earned break</span>
                  <span className="text-xs text-gray-400">Later</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="mt-14 border-t border-gray-200/80 pt-8 dark:border-gray-800 sm:mt-20 sm:pt-10">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-700 dark:text-violet-300">A more focused workflow</p>
              <h2 id="features-heading" className="mt-2 text-2xl font-semibold tracking-tight text-gray-950 dark:text-white">Everything you need to move forward</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">Less juggling, more doing. Let your task manager help you make sense of the day.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.number} className="rounded-2xl border border-gray-200 bg-white/80 p-5 dark:border-gray-800 dark:bg-gray-900/70">
                <span className="text-sm font-semibold text-violet-600 dark:text-violet-300">{feature.number}</span>
                <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
