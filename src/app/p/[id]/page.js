import { prisma } from "@/app/lib/prisma";

export default async function PastePage(props) {
  const { id } = await props.params;

  if (!id) {
    return <h1>404 - Invalid paste ID</h1>;
  }

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return <h1>404 - Not Found</h1>;
  }

  // TTL check
  if (paste.expiresAt && new Date() > paste.expiresAt) {
    return <h1>404 - Expired</h1>;
  }

  // Max views check
  if (paste.maxViews && paste.viewCount >= paste.maxViews) {
    return <h1>404 - View limit exceeded</h1>;
  }

  // ✅ IMPORTANT: increment view count
  await prisma.paste.update({
    where: { id },
    data: {
      viewCount: { increment: 1 },
    },
  });

  return (
    <main style={{ padding: "24px", whiteSpace: "pre-wrap" }}>
      {paste.content}
    </main>
  );
}


