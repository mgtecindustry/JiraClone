"use client";

import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import {
  SettingsIcon,
  UsersIcon,
  HelpCircle,
  Book,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DottedSeparator } from "./dotted-separator";

const mainRoutes = [
  { label: "Acasă", href: "", icon: GoHome, activeIcon: GoHomeFill },
  {
    label: "Sarcinile Mele",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Setări",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Membri",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const ItSupportNavigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const supportRoutes = [
    {
      label: "Suport IT",
      href: "/support",
      icon: HelpCircle,
      activeIcon: HelpCircle,
    },
    {
      label: "Tickete Suport IT",
      href: "/tickets",
      icon: Book,
      activeIcon: BookOpen,
    },
  ];

  return (
    <>
      {supportRoutes.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;
        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  return (
    workspaceId && (
      <ul className="flex flex-col">
        {/* Main Routes */}
        {mainRoutes.map((item) => {
          const fullHref = `/workspaces/${workspaceId}${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link key={item.href} href={fullHref}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <Icon className="size-5 text-neutral-500" />
                {item.label}
              </div>
            </Link>
          );
        })}
        <DottedSeparator className="my-4" />
      </ul>
    )
  );
};
