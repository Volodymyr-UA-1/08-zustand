"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from './SidebarNotes.module.css';

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export function SidebarNotes() {
  const pathname = usePathname();

  // Функція для перевірки, чи є посилання активним
  const isActive = (tag: string) => {
    if (tag === "All") return pathname === "/notes/filter/all";
    return pathname === `/notes/filter/${tag}`;
  };

  return (
    <div className={css.sidebarContainer}>
      <ul className={css.menuList}>
        {/* Посилання на всі нотатки */}
        <li className={css.menuItem}>
          <Link
            href="/notes/filter/all"
            className={`${css.menuLink} ${isActive("All") ? css.active : ""}`}
          >
            All notes
          </Link>
        </li>

        {/* Динамічний список тегів */}
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={`${css.menuLink} ${isActive(tag) ? css.active : ""}`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}