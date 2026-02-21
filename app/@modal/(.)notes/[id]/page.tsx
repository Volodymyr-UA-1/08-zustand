import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from "./NotePreview.client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 1. Очікуємо id (Next.js 15 Server Component)
  const { id } = await params; 

  const queryClient = new QueryClient();

  // 2. Префетчимо дані нотатки на сервері
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  // 3. Дегідруємо стан
  const dehydratedState = dehydrate(queryClient);

  return (
    // 4. Обгортаємо в HydrationBoundary для миттєвого відображення на клієнті
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}