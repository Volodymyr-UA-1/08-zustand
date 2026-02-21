'use client';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// useDebounce тут більше не потрібен, бо він є всередині SearchBox
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTag = VALID_TAGS.includes(initialTag) ? initialTag : "";

  // React Query тепер використовує 'search' напряму, 
  // бо SearchBox сам затримає оновлення цього значення через onSearch
  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", initialTag, page, search],
    queryFn: () => fetchNotes({ 
      tag: activeTag, 
      page, 
      perPage, 
      search: search 
    }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
  });

  const handlePageChange = (newPage: number) => {
    if (!data) return;
    if (newPage >= 1 && newPage <= data.totalPages) setPage(newPage);
  };

  // Ця функція спрацює лише після дебаунсу в 500мс всередині SearchBox
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Використовуємо тільки onSearch, як того вимагає інтерфейс SearchBoxProps */}
        <SearchBox onSearch={handleSearch} />
        
        {data && data.totalPages > 1 && (
          <Pagination 
            page={page} 
            totalPages={data.totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}

      {!isLoading && !isError && data && data.notes.length > 0 && (
        <>
          <NoteList notes={data.notes} />
          {isFetching && <div className={css.fetchingLoader}>Updating...</div>}
        </>
      )}

      {!isLoading && !isError && data && data.notes.length === 0 && (
        <EmptyState message={search ? "No notes match your search" : "No notes in this category"} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}