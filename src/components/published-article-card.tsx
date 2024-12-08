import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PublishedArticleCardProps {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  keywords: string[];
  imageUrl: string;
  onDraftCreated?: () => void;
  onDelete?: () => void;
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
  onDelete,
}: PublishedArticleCardProps) {
  const router = useRouter();
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);

  const handleCardClick = () => {
    router.push(`/content/detail/${id}`);
  };

  const handleCreateDraft = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`/api/content/${id}`);
      if (response.status === 200) {
        onDelete?.();
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <Card className="overflow-hidden cursor-pointer">
      <div className="relative h-48">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        <Badge className="absolute top-2 right-2 bg-green-500">Published</Badge>
      </div>
      <CardContent className="p-4">
        <Link
          href={`/admin/dashboard/content/edit/${id}`}
          className="text-lg font-semibold hover:text-yellow-600 line-clamp-2"
        >
          {title}
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
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={handleCreateDraft}
          disabled={isCreatingDraft}
          className="flex-1"
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
