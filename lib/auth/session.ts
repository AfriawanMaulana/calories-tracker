import { db } from "@/db";
import { generateToken, SESSION_COOKIE, sha256 } from "./utils";
import { dataAnak, sessions, users } from "@/db/schema";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";

export async function createSession(userId: string) {
  const token = generateToken();
  const hashedToken = sha256(token);

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await db.insert(sessions).values({
    userId,
    hashedToken,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const tokenHash = sha256(token);

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.hashedToken, tokenHash));

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.hashedToken, tokenHash));
    (await cookies()).delete(SESSION_COOKIE);
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(
      and(
        eq(sessions.hashedToken, tokenHash),
        gt(sessions.expiresAt, new Date())
      )
    );

  return user ?? null;
}

export async function getDataAnak() {
  const user = await getCurrentUser();

  if (!user) return null;

  const [data] = await db
    .select()
    .from(dataAnak)
    .where(eq(dataAnak.userId, user.id))
    .limit(1);

  return data ?? null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.delete(sessions).where(eq(sessions.hashedToken, sha256(token)));
  }

  cookieStore.set(SESSION_COOKIE, "", {
    path: "/",
    expires: new Date(0),
  });
}
