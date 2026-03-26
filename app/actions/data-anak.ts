"use server";

import { db } from "@/db";
import { dataAnak } from "@/db/schema";
import { getCurrentUser, getDataAnak } from "@/lib/auth/session";
import { DataAnakState } from "@/types/data_anak";
import { DataAnakSchema } from "@/validations/data_anak.schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function DataAnakAction(
  _prevState: DataAnakState,
  formData: FormData
): Promise<DataAnakState> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      errors: {
        _form: ["You are not logged in!"],
      },
      values: {
        name: "",
        age: "",
        ageDetail: "",
        weight: "",
        height: "",
      },
    };
  }

  const rawData = {
    name: formData.get("name") as string,
    age: formData.get("age") as string,
    ageDetail: formData.get("ageDetail") as string,
    weight: formData.get("weight") as string,
    height: formData.get("height") as string,
  };

  const result = DataAnakSchema.safeParse(rawData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      values: rawData,
    };
  }

  try {
    const { name, age, ageDetail, weight, height } = result.data;

    const existingData = await getDataAnak();

    if (existingData) {
      await db
        .update(dataAnak)
        .set({
          name,
          age: String(age),
          ageDetail,
          weight: String(weight),
          height: String(height),
        })
        .where(eq(dataAnak.id, existingData.id));
    } else {
      await db.insert(dataAnak).values({
        userId: user.id,
        name,
        age: String(age),
        ageDetail,
        weight: String(weight),
        height: String(height),
      });
    }
  } catch {
    return {
      errors: {
        _form: ["Something went wrong. Please try again!"],
      },
      values: rawData,
    };
  }

  redirect("/");
}
