import ReactMarkdown from "react-markdown";
import type { Chat } from "./chatTypes";
import { ChatLoading } from "./ChatIntro";

export function ChatMessages({ chats, isBusy }: { chats: Chat[]; isBusy: boolean }) {
  return (
    <>
      {chats.map((chat, index) => (
        <div key={`${chat.question}-${index}`} className="mx-auto max-w-3xl space-y-4">
          <div className="flex items-end justify-end gap-2">
            <div className="min-w-0 max-w-[36rem]">
              <p className="mb-1 text-right text-xs font-medium text-gray-400">You</p>
              <p className="w-full break-words rounded-2xl rounded-br-md bg-gradient-to-br from-violet-700 to-indigo-700 px-3.5 py-2.5 text-[15px] leading-6 text-white shadow-sm sm:px-4 sm:py-3 sm:text-base">{chat.question}</p>
            </div>
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-200">Y</span>
          </div>
          <div className="flex items-end gap-2">
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm text-violet-700 dark:bg-violet-900/60 dark:text-violet-200">✦</span>
            <div className="min-w-0 max-w-[42rem]">
              <p className="mb-1 text-xs font-medium text-gray-400">Task Assistant</p>
              {isBusy && index === chats.length - 1 ? <ChatLoading /> : <div className="chat-response w-full break-words rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[15px] leading-6 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:px-4 sm:py-3 sm:text-base"><ReactMarkdown>{chat.answer}</ReactMarkdown></div>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
