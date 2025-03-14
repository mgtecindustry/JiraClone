import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { getMemberByUserId } from "@/features/members/queries";

const TasksPage = async ({ params }: { params: { workspaceId: string } }) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  // Obținem membrul corespunzător utilizatorului curent în acest workspace
  const member = await getMemberByUserId({
    workspaceId: params.workspaceId,
    userId: user.$id,
  });

  // Dacă există un membru, folosim ID-ul său pentru a filtra sarcinile
  const memberId = member ? member.$id : undefined;

  return (
    <div className="w-full flex flex-col">
      <TaskViewSwitcher defaultAssigneeId={memberId} />
    </div>
  );
};

export default TasksPage;
