type ChatSidebarProps = {
  prompts: string[];
  disabled: boolean;
  onPromptSelect: (prompt: string) => void;
};

export function ChatSidebar({ prompts, disabled, onPromptSelect }: ChatSidebarProps) {
  return (
    <aside className="hidden border-r border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-950/60 lg:flex lg:flex-col">
      <div>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl text-white shadow-lg shadow-violet-600/20">✦</span>
          <div>
            <h2 className="font-semibold text-gray-950 dark:text-white">Task Assistant</h2>
            <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Ready to help</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">Try asking</p>
          <div className="mt-3 space-y-2">
            {prompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => onPromptSelect(prompt)} disabled={disabled} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-left text-sm leading-5 text-gray-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-violet-800 dark:hover:bg-violet-950/40 dark:hover:text-violet-200">
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto rounded-2xl bg-gradient-to-br from-violet-700 to-indigo-700 p-4 text-white">
        <p className="text-sm font-semibold">Make it manageable</p>
        <p className="mt-1 text-xs leading-5 text-violet-100">Share a goal, deadline, or busy list. I’ll help you find a clear next step.</p>
      </div>
    </aside>
  );
}
