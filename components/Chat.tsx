"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import Link from "next/link";

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

  const handleChatSubmit = async () => {
    if (isLoading) return;
    if (textareaRef.current?.value.trim()) {
      setIsLoading(true);
      const content = textareaRef.current.value.trim();
      const new_chats = [...chats, { role: "user", content }];
      setChats(new_chats);
      textareaRef.current.value = "";

      addChat({ role: "assistant", content: "..." });
      await axios
        .post(process.env.NEXT_PUBLIC_CHAT_URL || "", {
          messages: new_chats,
        })
        .then((res) => {
          const content = res.data;
          setChats((prev) => prev.slice(0, -1));
          addChat({ role: "assistant", content });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getStatusGiziHref = (command: string) => {
    const split = command.split(" ");
    const idx = split.indexOf(":gizi");
    if (idx === -1 || idx + 4 >= split.length) return "";
    return `/status-gizi/form?jenis_kelamin=${split[idx + 1]}&usia=${split[idx + 2]}&berat=${split[idx + 3]}&tinggi=${split[idx + 4]}`;
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
                <div className="relative aspect-square w-12 shrink-0">
                  <Image src="chatbot-icon.svg" alt="Chatbot" fill />
                </div>
              )}
              <div
                className={twMerge(
                  "overflow-auto whitespace-pre-line text-wrap break-words rounded-3xl px-5 py-6 text-xs font-medium lg:text-sm",
                  chat.role === "assistant"
                    ? "rounded-bl-none bg-[#EEEEEE] text-dark-50"
                    : "rounded-tr-none bg-primary-50 text-white",
                )}
              >
                {chat.content.includes(":gizi") ? (
                  <div className="flex flex-col gap-2">
                    Untuk melihat status gizi,
                    <br />
                    <Link href={getStatusGiziHref(chat.content)}>
                      <Button variant="primary" className="text-white">
                        Tekan tombol ini.
                      </Button>
                    </Link>
                  </div>
                ) : (
                  chat.content
                )}
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
