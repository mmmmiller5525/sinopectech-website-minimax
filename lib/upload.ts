// 上传：浏览器端调 /api/admin/upload（后端用 service_role 写 Storage）
export async function uploadImage(
  file: File,
  opts?: { bucket?: "products" | "assets" }
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("bucket", opts?.bucket || "products");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) return { ok: false, error: data.error || "upload failed" };
  return { ok: true, url: data.url };
}

export async function deleteImage(url: string): Promise<void> {
  const segments = url.split("/");
  const filename = segments[segments.length - 1];
  if (!filename) return;
  await fetch(`/api/admin/upload?file=${encodeURIComponent(filename)}`, { method: "DELETE" });
}
