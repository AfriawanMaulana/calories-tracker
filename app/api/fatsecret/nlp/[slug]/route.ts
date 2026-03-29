import { getAccessToken } from "@/lib/fatsecretToken";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return Response.json({ message: "Slug is needed" }, { status: 400 });
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return Response.json(
      {
        error: "No Access Token",
      },
      { status: 404 }
    );
  }

  try {
    const res = await fetch(
      `https://platform.fatsecret.com/rest/natural-language-processing/v1?user_input=${encodeURIComponent(
        slug
      )}&include_food_data=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return Response.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    console.error("Failed to fetch data");
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
