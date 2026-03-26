"use client";
import Link from "next/link";
import { LoginAction } from "@/app/actions/auth/login";
import { useActionState } from "react";

const initialState = {
  errors: {} as Record<string, string[]>,
  values: { email: "", password: "" },
};

export default function LoginPage() {
  const [formState, formAction, isPending] = useActionState(
    LoginAction,
    initialState
  );

  return (
    <div className="p-6 space-y-6 flex flex-col w-full">
      <div>
        <h1 className="text-3xl">Login</h1>
        <p>Login in to your account!</p>
      </div>

      <form
        action={formAction}
        className="flex flex-col w-full shadow-sm dark:shadow-white/10 border border-black/10 dark:border-white/10 p-4 rounded-2xl space-y-4"
      >
        {formState?.errors?._form?.length ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formState.errors._form[0]}
          </div>
        ) : null}

        <fieldset className="flex flex-col gap-2">
          <label>Email</label>
          <input
            id="email"
            name="email"
            disabled={isPending}
            autoComplete="email"
            type="email"
            className="input w-full"
            required
          />
          {formState?.errors?.email?.length ? (
            <p className="text-sm text-red-600">{formState.errors.email[0]}</p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label>Password</label>
          <input
            id="password"
            name="password"
            disabled={isPending}
            autoComplete="password"
            type="password"
            className="input w-full"
            required
          />
          {formState?.errors?.password?.length ? (
            <p className="text-sm text-red-600">
              {formState.errors.password[0]}
            </p>
          ) : null}
        </fieldset>

        <button type="submit" className="btn btn-success w-full text-white">
          {isPending ? "Loading..." : "Login"}
        </button>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="text-success">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
