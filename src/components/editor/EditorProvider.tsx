"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type EditorContextValue = {
  enabled: boolean;
  saving: boolean;
  setSaving: (v: boolean) => void;
  status: string | null;
  setStatus: (msg: string | null) => void;
  dirtyCount: number;
  bumpDirty: (delta: number) => void;
  saveContent: (key: string, content: string, title?: string) => Promise<boolean>;
  saveSetting: (key: string, value: string) => Promise<boolean>;
};

const EditorContext = createContext<EditorContextValue | null>(null);

const noopAsync = async () => false;

export function EditorProvider({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [dirtyCount, setDirtyCount] = useState(0);

  const bumpDirty = useCallback((delta: number) => {
    setDirtyCount((n) => Math.max(0, n + delta));
  }, []);

  const saveContent = useCallback(
    async (key: string, content: string, title?: string) => {
      setSaving(true);
      setStatus(null);
      try {
        const res = await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, content, title }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
        setStatus("Kaydedildi");
        setTimeout(() => setStatus(null), 2500);
        return true;
      } catch (e) {
        setStatus(e instanceof Error ? e.message : "Kayıt hatası");
        return false;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const saveSetting = useCallback(async (key: string, value: string) => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Ayar kaydedilemedi");
      setStatus("Ayar kaydedildi");
      setTimeout(() => setStatus(null), 2500);
      return true;
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Ayar hatası");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      saving,
      setSaving,
      status,
      setStatus,
      dirtyCount,
      bumpDirty,
      saveContent,
      saveSetting,
    }),
    [
      enabled,
      saving,
      status,
      dirtyCount,
      bumpDirty,
      saveContent,
      saveSetting,
    ]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    return {
      enabled: false,
      saving: false,
      setSaving: () => undefined,
      status: null,
      setStatus: () => undefined,
      dirtyCount: 0,
      bumpDirty: () => undefined,
      saveContent: noopAsync,
      saveSetting: noopAsync,
    };
  }
  return ctx;
}
