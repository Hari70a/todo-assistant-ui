import type { FormEvent } from "react";

type ChatComposerProps = {
  question: string;
  error: string;
  disabled: boolean;
  loading: boolean;
  onQuestionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onStream: () => void;
};

export function ChatComposer({ question, error, disabled, loading, onQuestionChange, onSubmit, onStream }: ChatComposerProps) {
  return (
    <div className="shrink-0 border-t border-gray-200 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-900 sm:px-6 sm:py-4">
      {error && <p role="alert" className="mx-auto mb-3 max-w-3xl rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
      <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-gray-300 bg-white p-2 shadow-sm transition focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-gray-700 dark:bg-gray-950">
          <textarea rows={2} value={question} onChange={(event) => onQuestionChange(event.target.value)} placeholder="What would you like to plan or work through?" disabled={disabled} className="min-h-12 w-full resize-none bg-transparent px-2 py-2 text-base text-gray-950 outline-none placeholder:text-gray-400 disabled:opacity-60 dark:text-white sm:min-h-14" />
          <div className="flex flex-col gap-2 border-t border-gray-100 pt-2 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <p className="hidden px-2 text-xs text-gray-400 sm:block">AI can make mistakes. Review important details.</p>
            <div className="flex gap-2">
              <button type="button" disabled={disabled} onClick={onStream} className="flex-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200 sm:flex-none sm:px-4 sm:py-2">Stream reply</button>
              <button type="submit" disabled={disabled} className="flex-1 rounded-xl bg-violet-700 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-700/20 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-400 sm:flex-none sm:px-5 sm:py-2">{loading ? "Sending..." : "Send message →"}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
