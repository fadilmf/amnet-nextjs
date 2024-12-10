export function bytesToObjectURL(bytes: any): string {
  if (!bytes) return "";

  // Handle jika data dalam format { type: 'Buffer', data: [...] }
  const bufferData = bytes.data ? bytes.data : bytes;

  // Convert Buffer array ke Uint8Array
  const uint8Array = new Uint8Array(bufferData);

  // Create Blob dari Uint8Array
  const blob = new Blob([uint8Array], { type: "image/jpeg" });

  // Create object URL dari Blob
  return URL.createObjectURL(blob);
}

export function revokeObjectURL(url: string) {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}
