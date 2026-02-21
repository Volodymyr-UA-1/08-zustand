'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api'; // Твоя функція з api.ts
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Оновлюємо кеш запитів, щоб нова нотатка з'явилася в списку
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      // ПОВНИЙ шлях для уникнення 404
      router.push('/notes/filter/all');
      router.refresh();
    },
    onError: (error) => {
      console.error('Помилка:', error);
      alert('Не вдалося створити нотатку.');
    }
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as NoteTag;

    // Валідація (як у твоєму коді)
    if (!title || title.length < 3) return alert('Title too short');

    mutate({ title, content, tag });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label>Title</label>
        <input type="text" name="title" className={css.input} required />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>
        <textarea name="content" rows={8} className={css.textarea} />
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select name="tag" className={css.select} defaultValue="Todo">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        {/* Кнопка Create */}
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
        
        {/* Кнопка Cancel — Тільки одна! */}
        <button 
          type="button" 
          className={css.cancelButton} 
          onClick={() => router.push('/notes/filter/all')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}