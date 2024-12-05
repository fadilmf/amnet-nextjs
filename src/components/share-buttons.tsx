"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  // WhatsApp,
  Instagram,
  Copy,
  // Telegram,
  // Line,
  // Pinterest,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast";

export function ShareButtons() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const title = typeof document !== "undefined" ? document.title : "";

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      hoverColor: "#0C63D4",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      hoverColor: "#0C85D0",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0A66C2",
      hoverColor: "#084D94",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        currentUrl
      )}&title=${encodeURIComponent(title)}`,
    },
    // {
    //   name: "WhatsApp",
    //   // icon: WhatsApp,
    //   color: "#25D366",
    //   hoverColor: "#1FAD53",
    //   url: `https://wa.me/?text=${encodeURIComponent(
    //     `${title} ${currentUrl}`
    //   )}`,
    // },
    // {
    //   name: "Telegram",
    //   // icon: Telegram,
    //   color: "#0088cc",
    //   hoverColor: "#006699",
    //   url: `https://t.me/share/url?url=${encodeURIComponent(
    //     currentUrl
    //   )}&text=${encodeURIComponent(title)}`,
    // },
    // {
    //   name: "Line",
    //   // icon: Line,
    //   color: "#00B900",
    //   hoverColor: "#009900",
    //   url: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    //     currentUrl
    //   )}`,
    // },
    // {
    //   name: "Pinterest",
    //   // icon: Pinterest,
    //   color: "#E60023",
    //   hoverColor: "#BD001D",
    //   url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    //     currentUrl
    //   )}&description=${encodeURIComponent(title)}`,
    // },
    // {
    //   name: "Email",
    //   icon: Mail,
    //   color: "#EA4335",
    //   hoverColor: "#D33426",
    //   url: `mailto:?subject=${encodeURIComponent(
    //     title
    //   )}&body=${encodeURIComponent(`Check this out: ${currentUrl}`)}`,
    // },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      // toast({
      //   title: "Link copied!",
      //   description: "The URL has been copied to your clipboard.",
      // });
    } catch (err) {
      // toast({
      //   title: "Failed to copy",
      //   description: "Please try copying the URL manually.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Share this article
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {shareLinks.map((platform) => {
          const Icon = platform.icon;
          return (
            <Button
              key={platform.name}
              variant="outline"
              size="lg"
              className="relative group overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: platform.color,
                borderColor: platform.color,
                color: "white",
              }}
              onClick={() => window.open(platform.url, "_blank")}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Icon className="w-5 h-5 mr-2" />
              <span className="font-medium">{platform.name}</span>
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="lg"
          className="relative group overflow-hidden transition-all duration-300 bg-gray-800 border-gray-800 text-white"
          onClick={copyToClipboard}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <Copy className="w-5 h-5 mr-2" />
          <span className="font-medium">Copy Link</span>
        </Button>
      </div>
    </div>
  );
}
