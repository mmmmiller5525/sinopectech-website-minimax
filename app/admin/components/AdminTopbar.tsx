export function AdminTopbar({ userEmail }: { userEmail: string }) {
  return (
    <header className="h-14 bg-white border-b border-black/5 flex items-center justify-between px-6">
      <div className="text-sm text-gray-500">Admin · {new Date().toLocaleDateString("en-CA")}</div>
      <div className="text-xs text-gray-600">{userEmail}</div>
    </header>
  );
}
