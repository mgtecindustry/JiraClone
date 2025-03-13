"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { usePathname } from "next/navigation";

const pathnameMap = {
  tasks: {
    title: "Sarcinile Mele",
    description: "Vizualizează toate proiectele și sarcinile tale aici.",
  },
  projects: {
    title: "Proiectul Meu",
    description: "Vizualizează sarcinile proiectului tău aici.",
  },
};

const defaultMap = {
  title: "Acasă",
  description: "Monitorizează toate proiectele și sarcinile tale aici.",
};

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
