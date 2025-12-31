export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { prisma } from "@/app/lib/prisma";

function getNow(req) {
  return new Date();
}

export async function GET(req, { params }) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id },
  });

  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return Response.json({ error: "Expired" }, { status: 404 });
  }

  if (paste.maxViews && paste.viewCount >= paste.maxViews) {
    return Response.json(
      { error: "View limit exceeded" },
      { status: 404 }
    );
  }

  await prisma.paste.update({
    where: { id: paste.id },
    data: { viewCount: { increment: 1 } },
  });

  return Response.json({ content: paste.content });
}
