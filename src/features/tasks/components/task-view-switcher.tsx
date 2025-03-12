"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader, PlusIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";
import { useCallback, useEffect, useRef } from "react";
import { TaskStatus } from "../types";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { DataCalendar } from "./data-calendar";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
  defaultProjectId?: string;
}

const TaskViewSwitcher = ({
  hideProjectFilter,
  defaultProjectId,
}: TaskViewSwitcherProps) => {
  const [filters, setFilters] = useTaskFilters();
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });

  const workspaceId = useWorkspaceId();
  const { open } = useCreateTaskModal();
  const { mutate: bulkUpdate } = useBulkUpdateTasks();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: filters.projectId,
    assigneeId: filters.assigneeId,
    status: filters.status,
    dueDate: filters.dueDate,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && defaultProjectId) {
      setFilters({
        ...filters,
        projectId: defaultProjectId,
      });
      isFirstRender.current = false;
    }
  }, [defaultProjectId, filters, setFilters]);

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );
  return (
    <Tabs
      className="w-full flex-1 border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="w-full h-8 lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="w-full h-8 lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="w-full h-8 lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto " onClick={open}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div>
            <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
              <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
