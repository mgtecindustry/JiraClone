"use client";

import { useGetItSupportTasks } from "@/features/it-support/api/use-get-it-support-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { Badge } from "@/components/ui/badge";
import { useUpdateItSupportTask } from "@/features/it-support/api/use-update-it-support-task";

const TicketPageClient = () => {
  const { data: tasks, isLoading, error } = useGetItSupportTasks();
  const { mutate: updateItSupportTask, isPending } = useUpdateItSupportTask();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <PageError message="Eroare la încărcarea cererilor de suport IT." />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">IT Support Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.length && tasks.length > 0 ? (
          tasks.map((task) => (
            <Card
              key={task.$id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {task.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  <strong>Descriere:</strong> {task.description}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong>{" "}
                  <Badge variant={task.status}>{task.status}</Badge>
                </p>
                <p className="text-gray-700">
                  <strong>Data Limită:</strong>{" "}
                  <span className="font-medium text-blue-600">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>Data Creării:</strong>{" "}
                  <span className="font-medium text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <p className="text-gray-700">
                  <strong>Prioritate:</strong> {task.priority}
                </p>
                <p className="text-gray-700">
                  <strong>Nume Solicitant:</strong> {task.requesterName}
                </p>
                <p className="text-gray-700">
                  <strong>Email Solicitant:</strong> {task.requesterEmail}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">Nu există cereri de suport IT.</p>
        )}
      </div>
    </div>
  );
};

export default TicketPageClient;
