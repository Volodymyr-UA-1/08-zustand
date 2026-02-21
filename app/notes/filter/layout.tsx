
import { ReactNode } from "react";
import css from './LayoutNotes.module.css';

export default function NotesLayout({ 
  children, 
  sidebar
}: { 
  children: ReactNode; 
  sidebar: ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        {sidebar}
      </aside>
      <main className={css.notesWrapper}>
        {children}
      </main>
    </div>
  );
}