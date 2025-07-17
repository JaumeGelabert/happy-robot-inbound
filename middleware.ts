import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply middleware to API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const apiKey =
      request.headers.get("authorization")?.replace("Bearer ", "") ||
      request.nextUrl.searchParams.get("api_key");

    const validApiKey = process.env.API_KEY;

    if (!validApiKey) {
      console.error("API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "API key is required. Provide it via Authorization header (Bearer token) or api_key query parameter"
        },
        { status: 401 }
      );
    }

    if (apiKey !== validApiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*"
};
