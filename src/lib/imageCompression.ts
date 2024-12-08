import imageCompression from "browser-image-compression";

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1, // maksimum 1MB
    maxWidthOrHeight: 1920, // maksimum width/height 1920px
    useWebWorker: true, // menggunakan web worker untuk proses di background
    initialQuality: 0.8, // kualitas awal 80%
  };

  try {
    const compressedFile = await imageCompression(file, options);
    // Buat File baru dengan nama yang sama
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
    });
  } catch (error) {
    console.error("Error compressing image:", error);
    return file; // Return file asli jika gagal kompresi
  }
}
