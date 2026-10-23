import { useEffect, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import SessionExpiryWidget from "../components/SessionExpiryWidget";
import { ChatComposer } from "../components/chat/ChatComposer";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatIntro } from "../components/chat/ChatIntro";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatSidebar } from "../components/chat/ChatSidebar";
import { quickPrompts, type Chat, type StreamPayload } from "../components/chat/chatTypes";
import { API_URL, getAccessToken } from "../lib/api";

const initialChats: Chat[] = [{
  question: "Help me plan a productive day.",
  answer: "Absolutely! Tell me what you need to accomplish, and I’ll help you turn it into a **clear, manageable plan**.",
}];

function addChat(setChats: Dispatch<SetStateAction<Chat[]>>, chat: Chat) {
  setChats((currentChats) => [...currentChats, chat]);
}

function updateChatAnswer(setChats: Dispatch<SetStateAction<Chat[]>>, chatIndex: number, answer: string) {
  setChats((currentChats) => currentChats.map((chat, index) => index === chatIndex ? { ...chat, answer } : chat));
}

function parseStreamEvent(event: string): StreamPayload | null {
  const dataLine = event.split(/\r?\n/).find((line) => line.startsWith("data:"));
  return dataLine ? JSON.parse(dataLine.slice("data:".length).trim()) as StreamPayload : null;
}

async function openStream(question: string, chatId: string, token: string) {
  const response = await fetch(`${API_URL}/chats/stream`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "text/event-stream" },
    method: "POST",
    body: JSON.stringify({ question, chat_id: chatId }),
  });
  if (!response.ok || !response.body) throw new Error("Unable to start the response stream.");
  return response.body;
}

async function readStream(body: ReadableStream<Uint8Array>, onPayload: (payload: StreamPayload) => void) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() ?? "";
    events.forEach((event) => {
      const payload = parseStreamEvent(event);
      if (payload) onPayload(payload);
    });
  }
}

async function requestChat(question: string, chatId: string, token: string) {
  const response = await axios.get(`${API_URL}/chats/`, {
    params: { question, chat_id: chatId },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default function Chatbot() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatId, setChatId] = useState("");
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatListRef.current?.scrollTo({
      top: chatListRef.current.scrollHeight,
      behavior: isStreaming ? "auto" : "smooth",
    });
  }, [chats, isStreaming]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function requireToken() {
    const token = getAccessToken();
    if (!token) navigate("/login");
    return token;
  }

  async function streamAnswer(value: string) {
    const cleanQuestion = value.trim();
    if (!cleanQuestion) {
      setError("Please enter a question.");
      return;
    }
    const token = requireToken();
    if (!token) return;

    const chatIndex = chats.length;
    let messageText = "";
    setIsStreaming(true);
    setError("");
    addChat(setChats, { question: cleanQuestion, answer: "" });
    setQuestion("");

    try {
      const body = await openStream(cleanQuestion, chatId, token);
      await readStream(body, (payload) => {
        if (payload.type === "meta" && payload.chat_id) setChatId(payload.chat_id);
        if (payload.type === "token" && payload.text) {
          messageText += payload.text;
          updateChatAnswer(setChats, chatIndex, messageText);
        }
        if(payload.type === "error" && payload.text) {
          setError(payload.text);
          updateChatAnswer(setChats, chatIndex, "Please fix the issue and try again.");
        }
      });
    } catch (streamError) {
      setError(`Unable to stream a response: ${streamError instanceof Error ? streamError.message : String(streamError)}`);
    } finally {
      setIsStreaming(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const cleanQuestion = question.trim();
    if (!cleanQuestion) {
      setError("Please enter a question.");
      return;
    }
    const token = requireToken();
    if (!token) return;

    const chatIndex = chats.length;
    addChat(setChats, { question: cleanQuestion, answer: "" });
    setQuestion("");
    try {
      setLoading(true);
      const data = await requestChat(cleanQuestion, chatId, token);
      updateChatAnswer(setChats, chatIndex, data.answer ?? data);
      if (data.chat_id) setChatId(data.chat_id);
    } catch (requestError) {
      setError(`Unable to get a response: ${requestError instanceof Error ? requestError.message : String(requestError)}`);
    } finally {
      setLoading(false);
    }
  }

  const isBusy = loading || isStreaming;

  return (
    <>
      <SessionExpiryWidget />
      <main className="h-[calc(100dvh-4rem)] overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-2 dark:from-violet-950/20 dark:via-gray-950 dark:to-indigo-950/20 sm:h-[calc(100dvh-5rem)] sm:p-5">
        <section className="mx-auto grid h-full max-w-7xl grid-rows-1 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-violet-950/10 dark:border-gray-800 dark:bg-gray-900 sm:rounded-3xl lg:grid-cols-[18rem_1fr]">
          <ChatSidebar prompts={quickPrompts} disabled={isBusy} onPromptSelect={setQuestion} />
          <div className="flex min-h-0 flex-col">
            <ChatHeader />
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 py-5 sm:space-y-7 sm:px-7 sm:py-6" ref={chatListRef}>
              <ChatIntro prompts={quickPrompts} disabled={isBusy} onPromptSelect={setQuestion} />
              <ChatMessages chats={chats} isBusy={isBusy} />
            </div>
            <ChatComposer
              question={question}
              error={error}
              disabled={isBusy}
              loading={loading}
              onQuestionChange={setQuestion}
              onSubmit={handleSubmit}
              onStream={() => void streamAnswer(question)}
            />
          </div>
        </section>
      </main>
    </>
  );
}
