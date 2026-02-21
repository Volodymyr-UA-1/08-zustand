'use client'
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (!totalPages || totalPages < 1) return null;

    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            previousClassName={css.prev}
            nextClassName={css.next}
            disabledClassName={css.disabled}
            nextLabel="→"
            previousLabel="←"
        />
    );
}