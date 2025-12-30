export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/app/lib/prisma";

export async function POST(req) {
  const body = await req.json();
  const { content, ttl_seconds, max_views } = body;

  if (!content || typeof content !== "string" || content.trim() === "") {
    return Response.json({ error: "Invalid content" }, { status: 400 });
  }

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return Response.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return Response.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  const paste = await prisma.paste.create({
    data: {
      content,
      expiresAt,
      maxViews: max_views ?? null,
    },
  });

  return Response.json({
  id: paste.id,
  url: `/p/${paste.id}`,
  });
}
