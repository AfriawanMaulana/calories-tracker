import { getAccessToken } from "@/lib/fatsecretToken";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const accessToken = await getAccessToken();

  if (!accessToken)
    return Response.json(
      { error: "Failed to get access token!" },
      { status: 500 }
    );

  const res = await fetch(
    `https://platform.fatsecret.com/rest/food/v5?method=food.get.v5&food_id=${id}&include_food_attributes=true&include_sub_categories=true&include_food_images=true&format=json&region=ID&language=id`,
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
}
