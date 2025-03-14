import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { ProjectAnalytics } from "./project-analytics";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  const initialValues = await getProject({
    projectId: params.projectId,
  });

  if (!user) {
    redirect("/sign-in");
  }
  if (!initialValues) {
    throw new Error("Project not found");
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>

        <div className="">
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Editează proiectul
            </Link>
          </Button>
        </div>
      </div>

      <ProjectAnalytics projectId={params.projectId} />

      <TaskViewSwitcher hideProjectFilter defaultProjectId={params.projectId} />
    </div>
  );
};

export default ProjectIdPage;
