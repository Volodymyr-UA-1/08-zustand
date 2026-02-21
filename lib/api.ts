import axios from "axios";
import type { Note, NoteTag } from "@/types/note"

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`, // свій токен
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

//  Створити нову нотатку
export const createNote = async (
  noteData: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

//  Видалити нотатку за ID
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
export const fetchNotes = async ({
  search = "",
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  
  // Створюємо об'єкт параметрів
  const queryParams: any = {
    search,
    page,
    perPage,
  };

  if (tag && tag !== "all") {
    queryParams.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });

  return data;
};
