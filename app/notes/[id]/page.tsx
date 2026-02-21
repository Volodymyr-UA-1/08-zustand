import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type NotePageProps = {
  params: Promise<{ id: string }>; // params приходить як Promise в Next.js 15
};

// 1. Додаємо ключове слово async
export default async function NotePage({ params }: NotePageProps) {
  // 2. Очікуємо отримання id з params
  const { id } = await params; 

  const queryClient = new QueryClient();

  // 3. Префетчимо нотатку на сервері
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // 4. Передаємо префетчені дані через HydrationBoundary
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}