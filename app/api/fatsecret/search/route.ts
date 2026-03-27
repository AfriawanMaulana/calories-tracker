export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ message: "Query is needed" }, { status: 400 });
  }

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
    console.error("TOKEN ERROR:", tokenData);
    return Response.json(
      { error: "Failed to get access token!" },
      { status: 500 }
    );
  }

  const res = await fetch("https://platform.fatsecret.com/rest/server.api", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      method: "foods.search",
      search_expression: query,
      format: "json",
      region: "ID",
      language: "id",
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("FATSECRET ERROR:", text);
    return Response.json({ error: text }, { status: res.status });
  }

  return Response.json(JSON.parse(text));
}
