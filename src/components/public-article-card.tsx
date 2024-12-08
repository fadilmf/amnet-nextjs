import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import Link from "next/link";

interface PublicArticleCardProps {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  keywords: string[];
  imageUrl?: string;
}

export function PublicArticleCard({
  id,
  title,
  summary,
  author,
  date,
  keywords,
  imageUrl,
}: PublicArticleCardProps) {
  return (
    <Link href={`/content/detail/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Article cover"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold hover:text-yellow-600 line-clamp-2">
            {title || "Untitled"}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            By {author || "Unknown author"} •{" "}
            {date ? new Date(date).toLocaleDateString() : "No date"}
          </p>
          <p className="mt-2 text-gray-600 line-clamp-2">
            {summary || "No summary available"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {keywords && keywords.length > 0 ? (
              <>
                {keywords.slice(0, 3).map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
                {keywords.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{keywords.length - 3}
                  </Badge>
                )}
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
