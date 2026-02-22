'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // Дістаємо стан чернетки та функції зі стору
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      // При успішному створенні — ОЧИЩАЄМО чернетку
      clearDraft(); 
      // Повертаємося на попередній маршрут
      router.back();
    },
    onError: (error) => {
      console.error('Помилка:', error);
      alert('Не вдалося створити нотатку.');
    }
  });

  // Обробник onChange для миттєвого збереження в Zustand
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!draft.title || draft.title.length < 3) {
      return alert('Title too short');
    }

    // Відправляємо актуальні дані з draft
    mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          className={css.input} 
          required 
          value={draft.title} // Автоматично підставляє draft або initialDraft
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>
        <textarea 
          name="content" 
          rows={8} 
          className={css.textarea} 
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select 
          name="tag" 
          className={css.select} 
          value={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
        
        <button 
          type="button" 
          className={css.cancelButton} 
          onClick={() => {
            // При Cancel НЕ очищаємо draft, просто повертаємося назад
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}