export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query)
    return Response.json({ message: "Query is needed" }, { status: 400 });

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

  if (!accessToken) {
    return Response.json(
      { error: "Failed to get access token!" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://platform.fatsecret.com/rest/foods/search/v1?method=foods.search&search_expression=${encodeURIComponent(
      query
    )}&region=ID&language=id&format=json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Error:", text);
    return Response.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return Response.json(data, { status: 200 });
}
