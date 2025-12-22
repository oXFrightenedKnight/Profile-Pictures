import { NextRequest } from "next/server";

const HONO_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploadthing`;

export async function GET(req: NextRequest) {
  return proxy(req);
}

export async function POST(req: NextRequest) {
  return proxy(req);
}

async function proxy(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname.replace("/api/uploadthing", "");
  const targetUrl = HONO_URL + path + url.search;

  const res = await fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" ? undefined : await req.arrayBuffer(),
  });

  // ❗ ФИЛЬТРУЕМ ОПАСНЫЕ HEADERS
  const headers = new Headers(res.headers);
  headers.delete("content-length");
  headers.delete("transfer-encoding");
  headers.delete("connection");

  return new Response(res.body, {
    status: res.status,
    headers,
  });
}
