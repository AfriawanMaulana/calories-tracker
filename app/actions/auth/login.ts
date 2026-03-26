"use server";
import { db } from "@/db";
import { LoginState } from "@/types/auth";
import { LoginSchema } from "@/validations/auth.schema";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth/session";

export async function LoginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = LoginSchema.safeParse(rawData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    return {
      errors: {
        _form: ["Email or password is incorrect"],
      },
    };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return {
      errors: {
        _form: ["Email or password is incorrect"],
      },
    };
  }

  await createSession(user.id);
  redirect("/");
}

export async function LogOutAction() {
  await deleteSession();

  redirect("/login");
}
