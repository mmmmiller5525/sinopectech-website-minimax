import { LoginForm } from "./LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Sign in · Admin" };

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/admin");
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">S</div>
            <div className="text-left">
              <div className="text-base font-bold text-gray-900">Sinopectech</div>
              <div className="text-[11px] text-gray-500">Admin Console</div>
            </div>
          </div>
        </div>
        <div className="card p-6 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900">Sign in</h1>
          <p className="text-sm text-gray-500 mt-1">Use the admin account created in Supabase Auth.</p>
          <div className="mt-6"><LoginForm /></div>
        </div>
        <div className="text-center mt-6 text-xs text-gray-500"><a href="/" className="hover:text-brand-700">← Back to website</a></div>
      </div>
    </div>
  );
}
