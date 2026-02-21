'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.client.module.css';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const handleClose = () => router.back();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    // Додаємо це налаштування сюди, як і в NoteDetailsClient
    refetchOnMount: false, 
  });

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <div className={css.loading}>Loading...</div>}
        
        {isError && <div className={css.error}>Failed to load note data.</div>}

        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2 className={css.title}>{note.title}</h2>
              <button className={css.backBtn} onClick={handleClose}>
                Close
              </button>
            </div>
            <div className={css.content}>{note.content}</div>
            <div className={css.footer}>
              <div className={css.tag}>{note.tag}</div>
              <div className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}