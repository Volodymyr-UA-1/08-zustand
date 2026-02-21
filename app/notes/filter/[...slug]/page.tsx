import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'; 
import NotesClient from "./Notes.client";
import { Metadata } from "next"

type Props = {
  params: {
    slug?: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug || [];
  const filter = slug[0] || "all";

  return {
    title: `Notes filter: ${filter} | NoteHub`,
    description: `Notes page with selected filter: ${filter}`,

    openGraph: {
      title: `Notes filter: ${filter}`,
      description: `Notes page with selected filter: ${filter}`,
      url: `https://notehub.com/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

// Додаємо async перед функцією
export default async function Page({ params }: Props) {
  const slug = params.slug || [];

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
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}