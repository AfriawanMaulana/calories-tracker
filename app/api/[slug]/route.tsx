// app/api/[slug]/route.ts
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  if (!req.url)
    return Response.json({ message: "URL not found" }, { status: 400 });

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) return Response.json({ message: "Query Null" }, { status: 400 });

  const res = await fetch(
    `https://api.calorieninjas.com/v1/${slug}?query=${query}`,
    {
      headers: {
        "X-Api-Key": process.env.CALORIE_NINJAS_API_KEY!,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.log("API ERROR:", text);
    return Response.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return Response.json(data);
}
