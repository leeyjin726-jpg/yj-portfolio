import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Sanity webhook revalidation handler
// Configure webhook in Sanity dashboard: POST https://yourdomain.com/api/revalidate?secret=YOUR_SECRET
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const type = body._type;

  switch (type) {
    case "blogPost":
      revalidateTag("blog");
      break;
    case "portfolioItem":
      revalidateTag("portfolio");
      break;
    case "product":
      revalidateTag("products");
      break;
    case "siteSettings":
      revalidateTag("settings");
      break;
    case "aboutPage":
      revalidateTag("about");
      break;
    case "contactPage":
      revalidateTag("contact");
      break;
    case "magazine":
      revalidateTag("magazine");
      break;
    default:
      revalidateTag("blog");
      revalidateTag("portfolio");
      revalidateTag("products");
      revalidateTag("settings");
      revalidateTag("about");
      revalidateTag("contact");
      revalidateTag("magazine");
  }

  return NextResponse.json({ revalidated: true, type });
}
