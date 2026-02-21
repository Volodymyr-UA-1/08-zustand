import css from './EmptyState.module.css';

interface EmptyStateProps {
    message?: string;
}

export default function EmptyState({
    message = "No notes found",
}: EmptyStateProps) {
    return <p className={css.emptyState}>{message}</p>;
}