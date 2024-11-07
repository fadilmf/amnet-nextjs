import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  title: string;
  description: string;
  //   imageUrl: string;
}

export function NewsCard({ title, description }: NewsCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={"/logo_amnet.png"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {/* <Link href={`/news/${id}`} className="text-green-700 hover:underline"> */}
        <Link href={`/news`} className="text-green-700 hover:underline">
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
