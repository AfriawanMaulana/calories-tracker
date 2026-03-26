"use client";
import { useActionState } from "react";
import { DataAnakAction } from "@/app/actions/data-anak";

const initialState = {
  errors: {} as Record<string, string[]>,
  values: { name: "", age: "", ageDetail: "", weight: "", height: "" },
};

export default function DataAnakForm({
  data,
}: {
  data: {
    name: string | null;
    age: string | null;
    ageDetail: string | null;
    weight: string | null;
    height: string | null;
  };
}) {
  const [formState, formAction, isPending] = useActionState(
    DataAnakAction,
    initialState
  );

  return (
    <div className="p-6 space-y-6 flex flex-col w-full">
      <h1 className="text-3xl">Data Anak</h1>
      <form
        action={formAction}
        className="flex flex-col w-full shadow-sm dark:shadow-white/10 border border-black/10 dark:border-white/10 p-4 rounded-2xl space-y-4"
      >
        {/* General Error */}
        {formState?.errors?._form?.length ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formState.errors._form[0]}
          </div>
        ) : null}
        <fieldset className="flex flex-col gap-2">
          <label>Nama Anak</label>
          <input
            id="name"
            name="name"
            defaultValue={
              formState.values.name !== ""
                ? formState.values.name
                : data.name ?? ""
            }
            disabled={isPending}
            autoComplete="name"
            type="text"
            className="input w-full"
            required
          />
          {formState?.errors?.name?.length ? (
            <p className="text-sm text-red-600">{formState.errors.name[0]}</p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label>Usia Anak</label>
          <div className="flex gap-2">
            <input
              id="age"
              name="age"
              defaultValue={
                formState.values.age !== ""
                  ? formState.values.age
                  : data.age ?? ""
              }
              disabled={isPending}
              type="number"
              step={0.1}
              className="input w-full"
              required
            />
            <select
              id="ageDetail"
              name="ageDetail"
              defaultValue={
                formState.values.ageDetail !== ""
                  ? formState.values.ageDetail
                  : data.ageDetail ?? "TAHUN"
              }
              disabled={isPending}
              className="select"
            >
              <option value={"TAHUN"}>tahun</option>
              <option value={"BULAN"}>bulan</option>
            </select>
          </div>
          {formState?.errors?.age?.length ? (
            <p className="text-sm text-red-600">{formState.errors.age[0]}</p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label>Berat Badan (kg)</label>
          <input
            id="weight"
            name="weight"
            defaultValue={
              formState.values.weight !== ""
                ? formState.values.weight
                : data.weight ?? ""
            }
            disabled={isPending}
            type="number"
            step={0.01}
            className="input w-full"
            required
          />
          {formState?.errors?.weight?.length ? (
            <p className="text-sm text-red-600">{formState.errors.weight[0]}</p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label>Tinggi Badan (cm)</label>
          <input
            id="height"
            name="height"
            defaultValue={
              formState.values.height !== ""
                ? formState.values.height
                : data.height ?? ""
            }
            disabled={isPending}
            type="number"
            step={0.01}
            className="input w-full"
            required
          />
          {formState?.errors?.height?.length ? (
            <p className="text-sm text-red-600">{formState.errors.height[0]}</p>
          ) : null}
        </fieldset>

        <button type="submit" className="btn btn-success w-full text-white">
          {isPending ? "Loading" : "Simpan"}
        </button>
      </form>
    </div>
  );
}
