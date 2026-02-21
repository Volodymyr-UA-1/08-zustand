'use client';
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { useState } from "react";
import type { Note } from "../../types/note";
import { useRouter } from "next/navigation";
import EmptyState from "../EmptyState/EmptyState";


interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onMutate: (id: string) => setDeletingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onSettled: () => setDeletingId(null),
  });

  if (!notes || notes.length === 0) return <EmptyState />;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.actions}>
              {/* Прямий шлях активує перехоплення (..)(..)notes */}
              <button
                className={css.detailsLink}
                onClick={() => router.push(`/notes/${note.id}`)}
              >
                View Details
              </button>

              <button
                className={css.button}
                onClick={() => {
                  if (confirm("Ви впевнені?")) mutate(note.id);
                }}
                disabled={deletingId === note.id}
              >
                {deletingId === note.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}