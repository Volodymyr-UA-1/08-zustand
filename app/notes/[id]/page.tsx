import { Metadata } from "next";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id || "");

  return {
    title: note?.title || "Note Details",
    description: note?.content?.slice(0, 30) || "Note details page",

    openGraph: {
      title: note?.title || "Note Details",
      description: note?.content?.slice(0, 30) || "Note details page",
      url: `https://notehub.com/notes/${params.id}`,
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

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id || ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
    </HydrationBoundary>
  );
}