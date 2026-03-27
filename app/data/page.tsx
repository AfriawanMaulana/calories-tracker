import { getDataAnak } from "@/lib/auth/session";
import DataAnakForm from "../components/ui/dataAnakForm";

export default async function DataAnakPage() {
  const data = await getDataAnak();
  return (
    <DataAnakForm
      data={{
        name: data?.name ?? "",
        gender: data?.gender ?? "",
        age: data?.age ?? "",
        ageDetail: data?.ageDetail ?? "TAHUN",
        weight: data?.weight ?? "",
        height: data?.height ?? "",
      }}
    />
  );
}
