"use client";

import Link from "next/link";
import { registerAction } from "@/app/actions/auth/register";
import { useActionState } from "react";

const initialState = {
  errors: {} as Record<string, string[]>,
  values: { name: "", email: "", password: "", confirmPassword: "" },
};

export default function RegisterPage() {
  const [formState, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  return (
    <div className="p-6 space-y-6 flex flex-col w-full">
      <div>
        <h1 className="text-3xl">Register</h1>
        <p>Create your account!</p>
      </div>

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
          <label>Username</label>
          <input
            id="name"
            name="name"
            defaultValue={formState.values.name ?? ""}
            disabled={isPending}
            autoComplete="name"
            type="text"
            className="input w-full"
            required
          />
          {/* Name error */}
          {formState?.errors?.name?.length ? (
            <p className="text-sm text-red-600">{formState.errors.name[0]}</p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label>Email</label>
          <input
            id="email"
            name="email"
            defaultValue={formState.values.email ?? ""}
            disabled={isPending}
            autoComplete="email"
            type="email"
            className="input w-full"
            required
          />
          {/* Email error */}
          {formState?.errors?.email?.length ? (
            <p className="text-sm text-red-600">{formState.errors.email[0]}</p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label>Password</label>
          <input
            id="password"
            name="password"
            defaultValue={formState.values.password ?? ""}
            disabled={isPending}
            type="password"
            className="input w-full"
            required
          />
          {/* Password error */}
          {formState?.errors?.password?.length ? (
            <p className="text-sm text-red-600">
              {formState.errors.password[0]}
            </p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            disabled={isPending}
            type="password"
            className="input w-full"
            required
          />
          {/* Confirm Password error */}
          {formState?.errors?.confirmPassword?.length ? (
            <p className="text-sm text-red-600">
              {formState.errors.confirmPassword[0]}
            </p>
          ) : null}
        </fieldset>

        <button type="submit" className="btn btn-success w-full text-white">
          {isPending ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href={"/login"} className="text-success">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
