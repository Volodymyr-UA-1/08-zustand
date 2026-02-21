
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'; 
import NotesClient from "./Notes.client";
import { Metadata } from "next"

type Props = {
  params: Promise<{ // Змінюємо тип на Promise
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; // 🔥 РОЗГОРТАЄМО PARAMS
  const slug = resolvedParams.slug || [];
  const filter = slug[0] || "all";

  return {
    title: `Notes filter: ${filter} | NoteHub`,
    description: `Notes page with selected filter: ${filter}`,
    openGraph: {
      title: `Notes filter: ${filter}`,
      description: `Notes page with selected filter: ${filter}`,
      url: `https://notehub.com/notes/filter/${filter}`,
      images: [{
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
      }],
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params; 
  const slug = resolvedParams.slug || [];
  const tag = slug.length > 0 ? slug[0] : "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 1],
    queryFn: () =>
      fetchNotes({
        tag: tag === "all" ? "" : tag,
        page: 1,
        search: "",
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* key={tag} тепер спрацює, бо tag став динамічним завдяки await */}
      <NotesClient key={tag} initialTag={tag} />
    </HydrationBoundary>
  );
}