import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ArticleCardProps {
  id: number;
  title: string | null;
  summary: string | null;
  author: string | null;
  date: string | null;
  keywords: string[];
  imageUrl: string;
  status?: "DRAFT" | "PUBLISHED";
}

export function ArticleCard({
  id,
  title,
  summary,
  author,
  date,
  keywords,
  imageUrl,
  status = "PUBLISHED",
}: ArticleCardProps) {
  return (
    <Link href={`/content/detail/${id}`}>
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={title || "Article cover"}
            fill
            className="object-cover"
            priority
          />
          {status === "DRAFT" && (
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 bg-yellow-500 text-white"
            >
              Draft
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {title || "Untitled"}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {summary || "No summary available"}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords &&
              keywords.length > 0 &&
              keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t bg-gray-50">
          <div className="flex justify-between items-center w-full text-sm text-gray-600">
            <span>{author || "Unknown author"}</span>
            <span>
              {date ? new Date(date).toLocaleDateString() : "No date"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
