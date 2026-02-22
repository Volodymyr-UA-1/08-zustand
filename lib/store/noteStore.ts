
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NoteTag } from '@/types/note';

interface DraftData {
  title: string;
  content: string;
  tag: NoteTag;
}

// Початковий стан згідно з ТЗ
const initialDraft: DraftData = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: DraftData;
  setDraft: (note: Partial<DraftData>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      // Функція оновлення полів чернетки
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      // Функція очищення до початкового стану
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage', // Ключ у localStorage
    }
  )
);