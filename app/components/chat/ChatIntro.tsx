type ChatIntroProps = {
  prompts: string[];
  disabled: boolean;
  onPromptSelect: (prompt: string) => void;
};

export function ChatIntro({ prompts, disabled, onPromptSelect }: ChatIntroProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span aria-hidden="true" className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl text-white shadow-lg shadow-violet-600/20 sm:h-12 sm:w-12">✦</span>
      <h2 className="mt-4 text-lg font-semibold text-gray-950 dark:text-white sm:text-xl">Let’s make today feel lighter.</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600 dark:text-gray-400">I can help prioritize your list, break down complex work, brainstorm ideas, or build a practical plan.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => onPromptSelect(prompt)} disabled={disabled} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-medium text-violet-700 transition hover:bg-violet-100 disabled:opacity-50 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200">{prompt}</button>
        ))}
      </div>
    </div>
  );
}

export function ChatLoading() {
  return <div aria-label="Assistant is typing" className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 sm:px-4 sm:py-3"><span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-violet-500" />Thinking through your request...</div>;
}
