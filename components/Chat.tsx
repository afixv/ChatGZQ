"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export default function Chat() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomchatRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState([
    {
      role: "assistant",
      content: "Halo! Silakan tanya apa saja terkait gizi ya!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addChat = (chat: { role: "assistant" | "user"; content: string }) => {
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
      const content = textareaRef.current.value.trim();
      addChat({ role: "user", content });
      textareaRef.current.value = "";

      // TODO: chatbot API
      setTimeout(() => addChat({ role: "assistant", content: "..." }), 200);
      setTimeout(() => {
        setChats((prev) => prev.slice(0, -1));
        addChat({ role: "assistant", content: "Lorem ipsum" });
        setIsLoading(false);
      }, 1000);
    }
  };
  return (
    <>
      <div className="container relative h-full w-full">
        {/* Chats */}
        <div className="absolute inset-0 flex flex-col gap-2 overflow-auto pr-2 pt-12">
          {chats.map((chat, idx) => (
            <div
              key={idx}
              className={twMerge(
                "flex w-fit max-w-full items-end gap-3",
                chat.role === "assistant" ? "self-start" : "self-end",
              )}
            >
              {chat.role === "assistant" && (
                <div className="relative aspect-square w-12">
                  <Image src="chatbot-icon.svg" alt="Chatbot" fill />
                </div>
              )}
              <div
                className={twMerge(
                  "overflow-auto text-wrap break-words rounded-3xl px-5 py-6 text-xs font-medium lg:text-sm",
                  chat.role === "assistant"
                    ? "rounded-bl-none bg-[#EEEEEE] text-dark-50"
                    : "rounded-tr-none bg-primary-50 text-white",
                )}
              >
                {chat.content}
              </div>
            </div>
          ))}
          <div ref={bottomchatRef} className="mt-2" />
        </div>
        {/* Top Fade */}
        <div className="fixed inset-x-0 top-14 h-14 bg-gradient-to-b from-white to-[transparent] lg:top-16" />
        {/* Bottom Fade */}
        {/* <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white to-[transparent]" /> */}
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
    </>
  );
}
