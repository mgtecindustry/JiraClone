import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import TicketPageClient from "./client";
export default async function TicketPage() {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="w-full flex flex-col">
      <TicketPageClient />
    </div>
  );
}
