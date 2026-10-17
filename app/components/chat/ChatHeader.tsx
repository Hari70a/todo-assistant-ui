export function ChatHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 px-3 py-3 dark:border-gray-800 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center gap-2">
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-200 lg:hidden">✦</span>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-gray-950 dark:text-white sm:text-xl">Your planning space</h1>
          <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">Ask, organize, and take your next step with confidence.</p>
        </div>
      </div>
      <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300 sm:px-3 sm:py-1.5">AI online</span>
    </header>
  );
}
