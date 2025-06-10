import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- 改行&段落の変更をして、バックエンドに送る～ ---
export type ParsedLine = {
  type: "paragraph" | "line",
  text: string
}

export const parseContent = (raw: string): ParsedLine[] => {
  return raw.split("\n").map(line => {
    const trimmed = line.trim()
    if (!trimmed) return { type: "line", text: "" } // 空行もlineとして保持
    return line.startsWith("　")
        ? { type: "paragraph", text: trimmed }
        : { type: "line", text: trimmed }
  })
}
