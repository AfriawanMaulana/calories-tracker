export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("=== FatSecret Debug ===");
  console.log("Food ID:", id);
  console.log("CLIENT_ID exists:", !!process.env.FATSECRET_CLIENT_ID);
  console.log("CLIENT_SECRET exists:", !!process.env.FATSECRET_CLIENT_SECRET);

  const tokenRes = await fetch("https://oauth.fatsecret.com/connect/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.FATSECRET_CLIENT_ID}:${process.env.FATSECRET_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

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
