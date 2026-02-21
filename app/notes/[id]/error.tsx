'use client';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function NoteDetailsError({ error, reset }: ErrorProps) {
    return (
        <div>
            <h2>Failed to load note</h2>
            <p>{error.message}</p>
            <button onClick={reset}>Retry</button>
        </div>
    );
}