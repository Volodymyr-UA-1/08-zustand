export type NoteTag = "all" | "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// нотаткa
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
