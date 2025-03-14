/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetItSupportTasks } from "@/features/it-support/api/use-get-it-support-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditTicketModal } from "./EditTicketModal";
import type { ItSupportTask } from "@/features/it-support/types";
import { useCurrent } from "@/features/auth/api/use-current";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  AlertTriangle,
  User,
  Mail,
  Edit,
  CheckCircle2,
  HelpCircle,
  Hourglass,
  RefreshCw,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const TicketPageClient = () => {
  const { data: tasks, isLoading, error } = useGetItSupportTasks();
  const [selectedTask, setSelectedTask] = useState<ItSupportTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(true);
  const [isInProgressOpen, setIsInProgressOpen] = useState(true);
  const [isResolvedOpen, setIsResolvedOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: currentUser } = useCurrent();

  const isAdmin = currentUser?.email === "administrator@mgtecindustry.ro";

  const handleEdit = (task: any) => {
    setSelectedTask(task as ItSupportTask);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const toggleNewTasks = () => {
    setIsNewOpen(!isNewOpen);
  };

  const toggleInProgressTasks = () => {
    setIsInProgressOpen(!isInProgressOpen);
  };

  const toggleResolvedTasks = () => {
    setIsResolvedOpen(!isResolvedOpen);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <PageError message="Eroare la încărcarea cererilor de suport IT." />;
  }

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "NEW":
        return <HelpCircle className="h-4 w-4" />;
      case "IN_PROGRESS":
        return <Hourglass className="h-4 w-4" />;
      case "RESOLVED":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Function to get card border color based on priority
  const getCardClassName = (priority: string, status: string) => {
    let baseClass =
      "shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ";

    // Priority-based styling
    if (priority === "HIGH" || priority === "CRITICAL") {
      baseClass += "border-l-red-500 ";
    } else if (priority === "MEDIUM") {
      baseClass += "border-l-yellow-500 ";
    } else {
      baseClass += "border-l-blue-500 ";
    }

    // Status-based styling
    if (status === "RESOLVED") {
      baseClass += "bg-gray-50 ";
    } else if (status === "IN_PROGRESS") {
      baseClass += "bg-blue-50 ";
    } else {
      baseClass += "bg-white ";
    }

    return baseClass;
  };

  const renderTicketSection = (
    title: string,
    status: string,
    isOpen: boolean,
    toggleFn: () => void
  ) => {
    const filteredTasks =
      tasks?.filter((task: any) => task.status === status) || [];
    const count = filteredTasks.length;

    return (
      <div className="mt-8">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Badge variant="outline" className="ml-2">
              {count}
            </Badge>
          </div>
          <Button
            size="sm"
            onClick={toggleFn}
            variant="ghost"
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
          >
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>

        {isOpen && (
          <>
            {count > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task: any) => (
                  <Card
                    key={task.$id}
                    className={getCardClassName(task.priority, task.status)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        {task.name}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge
                          variant={
                            task.status === "NEW"
                              ? "new"
                              : task.status === "IN_PROGRESS"
                              ? "inProgress"
                              : "resolved"
                          }
                          className="flex items-center gap-1"
                        >
                          {task.status === "NEW" && "Nou"}
                          {task.status === "IN_PROGRESS" && "În Progres"}
                          {task.status === "RESOLVED" && "Rezolvat"}
                        </Badge>
                        <Badge
                          variant={
                            task.priority === "HIGH"
                              ? "destructive"
                              : task.priority === "CRITICAL"
                              ? "destructive"
                              : task.priority === "MEDIUM"
                              ? "default"
                              : "outline"
                          }
                          className="flex items-center gap-1"
                        >
                          <AlertTriangle
                            className={`h-3 w-3 ${
                              task.priority === "LOW" ? "opacity-50" : ""
                            }`}
                          />
                          {task.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-700 mb-3 line-clamp-3">
                        {task.description}
                      </div>{" "}
                      <div className="text-sm font-semibold text-gray-700 mb-3 line-clamp-3">
                        Anydesk ID: {task.anydesk_id}
                      </div>
                      <Separator className="my-3" />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="h-3 w-3" />
                          <span>Creat: </span>
                          <span className="font-medium">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-600">
                          <Clock className="h-3 w-3" />
                          <span>Termen: </span>
                          <span className="font-medium">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex flex-col gap-1 text-xs mb-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <User className="h-3 w-3" />
                          <span>Solicitant: </span>
                          <span className="font-medium">
                            {task.requesterName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">
                            {task.requesterEmail}
                          </span>
                        </div>
                      </div>
                      {isAdmin && (
                        <Button
                          onClick={() => handleEdit(task)}
                          variant="outline"
                          className="w-full mt-2 flex items-center justify-center gap-2 hover:bg-gray-100"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                          Editează Ticket
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                Nu există tickete{" "}
                {status === "NEW"
                  ? "noi"
                  : status === "IN_PROGRESS"
                  ? "în progres"
                  : "rezolvate"}
                .
              </div>
            )}
          </>
        )}

        {selectedTask && (
          <EditTicketModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            task={selectedTask}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Actualizează
        </Button>
      </div>

      {renderTicketSection("Tickete Noi", "NEW", isNewOpen, toggleNewTasks)}
      {renderTicketSection(
        "Tickete în Desfășurare",
        "IN_PROGRESS",
        isInProgressOpen,
        toggleInProgressTasks
      )}
      {renderTicketSection(
        "Tickete Rezolvate",
        "RESOLVED",
        isResolvedOpen,
        toggleResolvedTasks
      )}
    </div>
  );
};

export default TicketPageClient;
