"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FAQ {
  id: number;
  question: string;
  category: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I leave a comment?",
    category: "Comments",
    answer:
      'To leave a comment on a post, scroll to the comment section at the bottom of the post. You must be logged in to comment. Enter your comment in the text box and click "Submit". Remember to follow our community guidelines when commenting. Your comment may be moderated before appearing publicly.',
  },
  {
    id: 2,
    question: "How can I become an admin?",
    category: "Administration",
    answer:
      "Becoming an admin requires a proven track record of positive contributions to our community. Start by being an active member, helping others, and following our guidelines. After consistent participation, you can apply for an admin position when openings are available. The process includes an application review, interview, and training period.",
  },
  {
    id: 3,
    question: "How do I contact an admin?",
    category: "Support",
    answer:
      'There are several ways to contact an admin: 1) Use the "Contact Admin" form in your dashboard, 2) Send a direct message to an admin through our messaging system, 3) Email our admin team at admin@example.com, or 4) Report an urgent issue using the "Report" button. Please allow 24-48 hours for a response.',
  },
  {
    id: 4,
    question: "How do I upload content?",
    category: "Content Management",
    answer:
      'To upload content: 1) Click the "New Post" button in your dashboard, 2) Choose the content type (text, image, video), 3) Upload your files using the upload button or drag-and-drop, 4) Add a title and description, 5) Select relevant categories and tags, 6) Preview your post, and 7) Click "Publish". Make sure your content follows our community guidelines.',
  },
  {
    id: 5,
    question: "How do I read posts?",
    category: "Navigation",
    answer:
      "You can browse posts in several ways: 1) Scroll through the main feed for recent posts, 2) Use the search bar to find specific topics, 3) Browse by categories or tags, 4) Visit user profiles to see their posts, or 5) Check your personalized feed based on your interests. Click any post to read it in full.",
  },
  {
    id: 6,
    question: "How do I edit my posts?",
    category: "Content Management",
    answer:
      'To edit a post: 1) Go to your profile or dashboard, 2) Find the post you want to edit, 3) Click the "Edit" button (pencil icon), 4) Make your changes in the editor, 5) Preview the changes, and 6) Click "Update". Note that some posts may have a time limit for editing, and major changes should include an edit note.',
  },
  {
    id: 7,
    question: "How do I customize my profile?",
    category: "Account Settings",
    answer:
      "Customize your profile by: 1) Going to Profile Settings, 2) Uploading a profile picture, 3) Adding a bio and personal information, 4) Setting your preferences for notifications and privacy, 5) Adding social media links, and 6) Choosing your display theme. Remember to save your changes.",
  },
  {
    id: 8,
    question: "How do I report inappropriate content?",
    category: "Moderation",
    answer:
      'To report inappropriate content: 1) Click the "Report" button on the content, 2) Select the reason for reporting, 3) Add any additional details about the violation, and 4) Submit the report. Our moderation team will review it within 24 hours. You can track your reports in your dashboard.',
  },
  {
    id: 9,
    question: "How do I use search filters?",
    category: "Navigation",
    answer:
      "Use search filters to find specific content: 1) Click the search bar, 2) Enter your keywords, 3) Use the filter buttons to narrow results by date, type, category, or popularity, 4) Sort results as needed, and 5) Save your search preferences for future use. Advanced search options are available for more specific queries.",
  },
  {
    id: 10,
    question: "How do I manage notifications?",
    category: "Account Settings",
    answer:
      "Manage your notifications in Settings: 1) Choose which activities trigger notifications, 2) Set your preferred notification methods (email, push, in-app), 3) Adjust frequency of digest emails, 4) Mute specific threads or users, and 5) Set quiet hours. You can also access quick notification settings through the bell icon.",
  },
];

export default function FAQPage() {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Image
            src="/carousel/4.png"
            alt="FAQ Logo"
            width={2400}
            height={1000}
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about using our platform.
            Can`&apos;`t find what you`&apos;`re looking for? Contact our
            support team.
          </p>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedFAQ(faq)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{faq.question}</CardTitle>
                <CardDescription>{faq.category}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Modal */}
      <Dialog open={!!selectedFAQ} onOpenChange={() => setSelectedFAQ(null)}>
        <DialogContent className="max-w-1m h-[50vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedFAQ?.question}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full mt-4">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Category: {selectedFAQ?.category}
              </div>
              <div className="text-lg leading-relaxed whitespace-pre-wrap">
                {selectedFAQ?.answer}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
