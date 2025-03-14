import { getCurrent } from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import { NoWorkspaceHome } from "@/features/workspaces/components/no-workspace-home";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    return <NoWorkspaceHome />;
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
