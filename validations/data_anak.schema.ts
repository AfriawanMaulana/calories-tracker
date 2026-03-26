import { z } from "zod";

export const DataAnakSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.coerce.number().min(1, "Age must be at least 1"),
  ageDetail: z.enum(["TAHUN", "BULAN"]),
  weight: z.coerce.number().min(1, "Weight must be at least 1"),
  height: z.coerce.number().min(1, "Height must be at least 1"),
});
