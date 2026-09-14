import { useSyncExternalStore } from "react";
import type { Classification, TriagemAnswers } from "./classification";

export interface TriagemRecord {
  id: string;
  answers: TriagemAnswers;
  classification: Classification;
  createdAt: string;
}

const STORAGE_KEY = "foco-na-reforma:triagem";

export function saveTriagemRecord(record: TriagemRecord) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // sessionStorage indisponível (modo privado etc.): a página de resultado
    // trata a ausência do registro normalmente.
  }
}

export function getTriagemRecord(id?: string | null): TriagemRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw) as TriagemRecord;
    if (id && record.id !== id) return null;
    return record;
  } catch {
    return null;
  }
}

let cachedRaw: string | null = null;
let cachedRecord: TriagemRecord | null = null;

function readSnapshot(): TriagemRecord | null {
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try {
    raw = window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedRecord = raw ? (JSON.parse(raw) as TriagemRecord) : null;
    } catch {
      cachedRecord = null;
    }
  }
  return cachedRecord;
}

function subscribe(): () => void {
  // sessionStorage não dispara eventos na própria aba que fez a alteração;
  // o registro é sempre gravado antes deste componente montar.
  return () => {};
}

function getServerSnapshot(): TriagemRecord | null {
  return null;
}

/** Lê o registro de triagem da sessionStorage de forma segura para SSR/hidratação. */
export function useTriagemRecord(id?: string | null): TriagemRecord | null {
  const record = useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);
  if (id && record && record.id !== id) return null;
  return record;
}

export function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
