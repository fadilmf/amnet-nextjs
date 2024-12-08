import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImageIcon, Trash2, Edit, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  keywords: string[];
  imageUrl?: string;
  onDelete?: () => void;
  onPublish?: () => void;
}

export function ArticleCard({
  id,
  title,
  summary,
  author,
  date,
  keywords,
  imageUrl,
  onDelete,
  onPublish,
}: ArticleCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah tindakan default (misalnya navigasi pada `<a>` atau `<form>`).
    e.stopPropagation(); // Mencegah event bubbling ke elemen parent.

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete?.();
      } else {
        console.error("Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <Card className="overflow-hidden">
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
        <Badge className="absolute top-2 right-2 bg-yellow-500">Draft</Badge>
      </div>
      <CardContent className="p-4">
        <Link href={`/admin/dashboard/content/edit/${id}`}>
          <h3 className="text-lg font-semibold hover:text-yellow-600 line-clamp-2">
            {title || "Untitled"}
          </h3>
        </Link>
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
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button onClick={onPublish} className="flex-1" variant="outline">
          Publish
        </Button>

        <Link href={`/admin/dashboard/content/edit/${id}`}>
          <Button
            variant="secondary"
            size="icon"
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
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
              <AlertDialogAction onClick={(e) => handleDelete(e)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
