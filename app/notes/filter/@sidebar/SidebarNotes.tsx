"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from './SidebarNotes.module.css';

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export function SidebarNotes() {
  const pathname = usePathname();

  const isActive = (tag: string) => {
    // Для "All" перевіряємо точний збіг з /all
    if (tag === "All") return pathname === "/notes/filter/all";
    // Для інших — точний збіг з великої літери, як у масиві tags
    return pathname === `/notes/filter/${tag}`;
  };

  return (
    <div className={css.sidebarContainer}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link
            href="/notes/filter/all"
            className={`${css.menuLink} ${isActive("All") ? css.active : ""}`}
          >
            All notes
          </Link>
        </li>

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