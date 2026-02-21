'use client';

import { useEffect } from 'react';
import css from './Notes.client.module.css'; // Імпортуємо твої стилі

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function NotesError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Логуємо помилку в консоль, щоб ти міг її побачити під час розробки
        console.error("Error caught by boundary:", error);
    }, [error]);

    return (
        <div className={css.app} style={{ textAlign: 'center', padding: '40px' }}>
            <h2 style={{ marginBottom: '16px' }}>Something went wrong while loading notes</h2>
            <p style={{ color: '#ef4444', marginBottom: '24px' }}>{error.message}</p>
            <button 
                className={css.button} // Використовуємо твій існуючий клас кнопки
                onClick={reset}
            >
                Try again
            </button>
        </div>
    );
}