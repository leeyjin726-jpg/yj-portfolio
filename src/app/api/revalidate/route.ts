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
      revalidateTag("blog", "max");
      break;
    case "portfolioItem":
      revalidateTag("portfolio", "max");
      break;
    case "product":
      revalidateTag("products", "max");
      break;
    case "siteSettings":
      revalidateTag("settings", "max");
      break;
    case "aboutPage":
      revalidateTag("about", "max");
      break;
    case "contactPage":
      revalidateTag("contact", "max");
      break;
    case "magazine":
      revalidateTag("magazine", "max");
      break;
    default:
      revalidateTag("blog", "max");
      revalidateTag("portfolio", "max");
      revalidateTag("products", "max");
      revalidateTag("settings", "max");
      revalidateTag("about", "max");
      revalidateTag("contact", "max");
      revalidateTag("magazine", "max");
  }

  return NextResponse.json({ revalidated: true, type });
}
