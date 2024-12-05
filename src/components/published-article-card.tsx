import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

interface PublishedArticleCardProps {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  keywords: string[];
  imageUrl: string;
  onDraftCreated?: () => void;
}

export function PublishedArticleCard({
  id,
  title,
  summary,
  author,
  date,
  keywords,
  imageUrl,
  onDraftCreated,
}: PublishedArticleCardProps) {
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);

  const handleCreateDraft = async () => {
    setIsCreatingDraft(true);
    try {
      const response = await axios.post(`/api/content/${id}/draft`);
      if (response.status === 200) {
        onDraftCreated?.();
      }
    } catch (error) {
      console.error("Error creating draft:", error);
    } finally {
      setIsCreatingDraft(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-green-500">Published</Badge>
      </div>
      <CardContent className="p-4">
        <Link href={`/admin/dashboard/content/edit/${id}`}>
          <h3 className="text-lg font-semibold hover:text-yellow-600 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          By {author} • {new Date(date).toLocaleDateString()}
        </p>
        <p className="mt-2 text-gray-600 line-clamp-2">{summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
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
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleCreateDraft}
          disabled={isCreatingDraft}
          className="w-full"
          variant="outline"
        >
          {isCreatingDraft ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Draft...
            </>
          ) : (
            "Add to Draft"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
