"use client";

import IconWrapper from "./IconWrapper";
import { FaUserAlt } from "react-icons/fa";
import Chat from "../Chat";

export default function ChatSection({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  return (
    <div className="sticky top-0 hidden h-screen w-1/3 border-l border-light-30 bg-[#F8F8F8] p-2 py-24 lg:block">
      <div className="flex flex-col items-center justify-center gap-2">
        <IconWrapper variant="secondary">
          <FaUserAlt />
        </IconWrapper>
        <div className="text-center">
          <h2 className="text-sm font-bold">{name}</h2>
          <p className="text-xs font-medium text-dark-80">{email}</p>
        </div>
      </div>
      <div className="relative my-8 px-4">
        <hr className="border-dark-100" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-[#F8F8F8] px-2 text-sm font-medium text-dark-90">
          Konsultasi Gizi
        </span>
      </div>
      {/*  */}
      <div className="flex h-[85%] flex-col justify-between">
        <Chat />
      </div>
    </div>
  );
}
