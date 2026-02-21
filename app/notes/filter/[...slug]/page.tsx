import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'; // Переконайтеся, що шлях правильний
import NotesClient from "./Notes.client";

// Додаємо async перед функцією
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  // Очікуємо на params, оскільки в Next.js 15 це Promise
  const { slug } = await params;
  
  // Витягуємо тег: якщо slug[0] існує, беремо його, інакше 'all'
  const tag = slug && slug.length > 0 ? slug[0] : 'all';

  const queryClient = new QueryClient();

  // Префетчимо дані на сервері
  // Використовуємо await, який тепер дозволений в async функції
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1, ''], 
    queryFn: () => fetchNotes({ tag: tag === 'all' ? '' : tag, page: 1, search: '' }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // Передаємо префетчені дані через HydrationBoundary
    <HydrationBoundary state={dehydratedState}>
      {/* Передаємо початковий тег у клієнтський компонент */}
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}