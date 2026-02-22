'use client';

import { useState, useEffect } from "react";
import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
    onSearch: (value: string) => void;
    initialValue?: string; // Додаємо пропс для скидання
}

export default function SearchBox({ onSearch, initialValue = "" }: SearchBoxProps) {
    const [value, setValue] = useState(initialValue);

    // Синхронізуємо локальний стейт, якщо initialValue змінився (наприклад, став "")
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const debouncedSearch = useDebouncedCallback((val: string) => {
        onSearch(val);
    }, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue); // Миттєво оновлюємо інпут (користувач бачить текст)
        debouncedSearch(newValue); // Дебаунсимо відправку значення "наверх"
    };

    return (
        <input
            className={css.input}
            type="text"
            value={value} // Тепер інпут контрольований
            onChange={handleChange}
            placeholder="Search notes..."
        />
    );
}