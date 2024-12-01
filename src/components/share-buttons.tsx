"use client";

import { Facebook, Twitter, Linkedin, Link } from "lucide-react";
import { Button } from "./ui/button";
// import { toast } from "./ui/use-toast";

export function ShareButtons() {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = document.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      //   toast({
      //     description: "Link copied to clipboard!",
      //   });
      return;
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("facebook")}
        className="rounded-full hover:bg-blue-100"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("twitter")}
        className="rounded-full hover:bg-blue-100"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("linkedin")}
        className="rounded-full hover:bg-blue-100"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("copy")}
        className="rounded-full hover:bg-gray-100"
      >
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
}
