import Image from "next/image";
import { useEffect, useState } from "react";
import { bytesToObjectURL, revokeObjectURL } from "@/lib/imageUtils";

interface BytesImageProps {
  bytes: {
    type: string;
    data: number[];
  } | null;
  preview?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function BytesImage({
  bytes,
  preview,
  alt,
  width,
  height,
  className,
}: BytesImageProps) {
  const [objectUrl, setObjectUrl] = useState<string>("");

  useEffect(() => {
    if (preview) {
      setObjectUrl(preview);
      return;
    }

    if (bytes) {
      const url = bytesToObjectURL(bytes);
      setObjectUrl(url);
    }

    return () => {
      if (objectUrl && !preview) {
        revokeObjectURL(objectUrl);
      }
    };
  }, [bytes, preview]);

  if (!objectUrl) {
    return null;
  }

  return (
    <Image
      src={objectUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
