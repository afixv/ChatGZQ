"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export default function Page() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomchatRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState([
    {
      from: "chatbot",
      message: "Halo! Silakan tanya apa saja terkait gizi ya!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addChat = (chat: { from: "chatbot" | "user"; message: string }) => {
    setChats((prev) => [...prev, chat]);
  };
  useEffect(() => {
    bottomchatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chats]);

  const handleChatSubmit = () => {
    if (isLoading) return;
    if (textareaRef.current?.value.trim()) {
      setIsLoading(true);
      const message = textareaRef.current.value.trim();
      addChat({ from: "user", message });
      textareaRef.current.value = "";

      // TODO: chatbot API
      setTimeout(() => addChat({ from: "chatbot", message: "..." }), 200);
      setTimeout(() => {
        setChats((prev) => prev.slice(0, -1));
        addChat({ from: "chatbot", message: "Lorem ipsum" });
        setIsLoading(false);
      }, 1000);
    }
  };
  return (
    <main className="flex h-screen flex-col items-center gap-2 px-5 pb-12 pt-14 lg:px-[4%] lg:pt-16">
      <div className="container relative h-full w-full">
        {/* Chats */}
        <div className="absolute inset-0 flex flex-col gap-2 overflow-auto pr-2 pt-16">
          {chats.map((chat, idx) => (
            <div
              key={idx}
              className={twMerge(
                "flex w-fit max-w-full items-end gap-3",
                chat.from === "chatbot" ? "self-start" : "self-end",
              )}
            >
              {chat.from === "chatbot" && (
                <div className="relative aspect-square w-12">
                  <Image src="chatbot-icon.svg" alt="Chatbot" fill />
                </div>
              )}
              <div
                className={twMerge(
                  "overflow-auto text-wrap break-words rounded-3xl px-5 py-6 text-xs lg:text-sm",
                  chat.from === "chatbot"
                    ? "rounded-bl-none bg-[#EEEEEE]"
                    : "rounded-tr-none bg-primary-50",
                )}
              >
                {chat.message}
              </div>
            </div>
          ))}
          <div ref={bottomchatRef} className="mt-2" />
        </div>
        {/* Top Fade */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white to-[transparent]" />
        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white to-[transparent]" />
      </div>
      <div
        className="flex h-auto w-full max-w-[690px] cursor-text items-center gap-2 rounded-[36px] bg-white px-7 py-4 [filter:drop-shadow(6.15px_4.92px_24.62px_#00000021)]"
        onClick={() => textareaRef.current?.focus()}
      >
        <textarea
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleChatSubmit();
            }
          }}
          className="h-fit max-h-[100px] w-full resize-none outline-none [field-sizing:content]"
          placeholder="Ketik pesan Anda"
        />
        <button
          onClick={handleChatSubmit}
          className="h-8 w-8 text-xl text-primary-60"
        >
          <PiPaperPlaneRightFill />
        </button>
      </div>
    </main>
  );
}
