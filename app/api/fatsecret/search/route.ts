import { getAccessToken } from "@/lib/fatsecretToken";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ message: "Query is needed" }, { status: 400 });
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error("TOKEN ERROR:", accessToken);
    return Response.json(
      { error: "Failed to get access token!" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://platform.fatsecret.com/rest/foods/search/v1?method=foods.search&search_expression=${query}&format=json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("FATSECRET ERROR:", text);
    return Response.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return Response.json(data);
}
