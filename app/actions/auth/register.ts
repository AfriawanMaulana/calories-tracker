"use server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { RegisterSchema } from "@/validations/auth.schema";
import { RegisterState } from "@/types/auth";
import { redirect } from "next/navigation";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = RegisterSchema.safeParse(rawData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      values: { name: rawData.name, email: rawData.email },
    };
  }

  try {
    const { name, email, password } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existingUser.length > 0) {
      return {
        errors: {
          _form: [
            "Email is already registered, please log in or use another email",
          ],
        },
        values: {
          name: rawData.name,
        },
      };
    }

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
  } catch {
    return {
      errors: {
        _form: ["Something went wrong. Please try again!"],
      },
      values: {
        name: result.data.name,
        email: result.data.email,
      },
    };
  }
  redirect("/login");
}
