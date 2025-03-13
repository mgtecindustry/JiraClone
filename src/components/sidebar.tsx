import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import Projects from "./projects";
import { ItSupportNavigation } from "./navigation";
export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full ">
      <Link href="/">
        <Image
          src="/logo.avif"
          alt="logo"
          width={156}
          height={72}
          className="mb-10"
        />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <ItSupportNavigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
