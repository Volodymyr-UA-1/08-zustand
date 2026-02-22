'use client';

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import EmptyState from "@/components/EmptyState/EmptyState";
import SearchBox from "@/components/SearchBox/SearchBox"; 
import css from "./Notes.client.module.css";

const perPage = 12;
const VALID_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

interface NotesClientProps {
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Скидаємо фільтри при зміні категорії в URL
  useEffect(() => {
    setPage(1);
    setSearch(""); 
  }, [initialTag]);

  const activeTag = VALID_TAGS.includes(initialTag) ? initialTag : "";

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>({
    // React Query бачить змінений search тільки через 500мс після затримки в SearchBox
    queryKey: ["notes", initialTag, page, search], 
    queryFn: () =>
      fetchNotes({
        tag: activeTag,
        page,
        perPage,
        search: search,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
  });

  // Додаємо відсутню функцію зміни сторінки (виправляє Error 2304)
  const handlePageChange = (newPage: number) => {
    if (!data) return;
    if (newPage >= 1 && newPage <= data.totalPages) {
      setPage(newPage);
    }
  };

  // Ця функція викликається з SearchBox після дебаунсу
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} initialValue={search} />

        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}

      {!isLoading && !isError && data && data.notes.length > 0 && (
        <>
          <NoteList notes={data.notes} />
          {isFetching && (
            <div className={css.fetchingLoader}>Updating...</div>
          )}
        </>
      )}

      {!isLoading && !isError && data && data.notes.length === 0 && (
        <EmptyState
          message={
            search
              ? "No notes match your search"
              : "No notes in this category"
          }
        />
      )}
    </div>
  );
}