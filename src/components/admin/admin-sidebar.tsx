"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Layout,
  FileText,
  BookmarkIcon,
  Settings,
  Users,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink = ({ href, icon, children }: SidebarLinkProps) => (
  <Link
    href={href}
    className="flex items-center p-2 rounded-lg hover:bg-gray-300 transition-colors"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const sidebarLinks = [
  { href: "/admin/dashboard", icon: <Layout size={20} />, label: "Dashboard" },
  {
    href: "/admin/dashboard/content",
    icon: <FileText size={20} />,
    label: "Content",
  },
  {
    href: "/admin/dashboard/draft",
    icon: <FileText size={20} />,
    label: "Draft",
  },
  {
    href: "/admin/dashboard/bookmark",
    icon: <BookmarkIcon size={20} />,
    label: "Bookmark",
  },
];

const masterLinks = [
  {
    href: "/admin/dashboard/announcement",
    icon: <Bell size={20} />,
    label: "Announcement",
  },
  // {
  //   href: "/admin/dashboard/user-setting",
  //   icon: <Users size={20} />,
  //   label: "User Setting",
  // },
  {
    href: "/admin/dashboard/user-list",
    icon: <Settings size={20} />,
    label: "Admin Setting",
  },
];

export function AdminSidebar() {
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const { user } = useAuth();

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <aside className="w-64 bg-gray-200 rounded-lg shadow-md m-4 p-4">
      <nav className="space-y-2">
        {sidebarLinks.map((link, index) => (
          <SidebarLink key={link.href} href={link.href} icon={link.icon}>
            {link.label}
          </SidebarLink>
        ))}
        {isSuperAdmin && (
          <Collapsible open={isMasterOpen} onOpenChange={setIsMasterOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-2 hover:bg-gray-300"
              >
                <span className="flex items-center">
                  <Settings size={20} />
                  <span className="ml-2">Master</span>
                </span>
                {isMasterOpen ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-2">
              {masterLinks.map((link) => (
                <SidebarLink key={link.href} href={link.href} icon={link.icon}>
                  {link.label}
                </SidebarLink>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </nav>
    </aside>
  );
}
