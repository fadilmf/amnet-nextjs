import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  id?: string;
  title: string;
  summary?: string;
  author?: string;
  date?: string;
  keywords?: string[];
  imageUrl: string | null | undefined;
}

export function ArticleCard({
  id,
  title,
  summary,
  author,
  date,
  keywords,
  imageUrl,
}: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl || ""}
          // src={""}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex-grow p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-justify">{summary}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords?.map((keyword) => (
            <Badge key={keyword} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={`/content/detail/${id}`}
          className="bg-green-700 text-white hover:bg-green-800 hover:scale-105 rounded px-4 py-2 text-primary hover:underline"
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
