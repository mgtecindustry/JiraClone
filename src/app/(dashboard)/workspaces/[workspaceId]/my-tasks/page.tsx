import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { getMemberByUserId } from "@/features/members/queries";

const MyTasksPage = async ({ params }: { params: { workspaceId: string } }) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  // Obținem membrul corespunzător utilizatorului curent în acest workspace
  const member = await getMemberByUserId({
    workspaceId: params.workspaceId,
    userId: user.$id,
  });

  // Dacă nu există un membru, redirecționăm către pagina de sarcini
  if (!member) {
    redirect(`/workspaces/${params.workspaceId}/tasks`);
  }

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Sarcinile Mele</h1>
      <TaskViewSwitcher defaultAssigneeId={member.$id} />
    </div>
  );
};

export default MyTasksPage;
