"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  UserCheck,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkspaceAnalytics {
  taskCount: number;
  taskDifference: number;
  assignedTaskCount: number;
  assignedTaskDifference: number;
  completedTaskCount: number;
  completedTaskDifference: number;
  incompleteTaskCount: number;
  incompleteTaskDifference: number;
  overdueTaskCount: number;
  overdueTaskDifference: number;
}

interface WorkspaceAnalyticsProps {
  data: WorkspaceAnalytics;
  isLoading: boolean;
}

export function WorkspaceAnalytics({
  data,
  isLoading,
}: WorkspaceAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }
  const items = [
    {
      title: "Sarcini totale",
      value: data.taskCount,
      difference: data.taskDifference,
      icon: ClipboardList,
    },
    {
      title: "Sarcini atribuite",
      value: data.assignedTaskCount,
      difference: data.assignedTaskDifference,
      icon: UserCheck,
    },
    {
      title: "Sarcini finalizate",
      value: data.completedTaskCount,
      difference: data.completedTaskDifference,
      icon: CheckCircle,
    },
    {
      title: "Sarcini restante",
      value: data.overdueTaskCount,
      difference: data.overdueTaskDifference,
      icon: AlertCircle,
      negative: true,
    },
    {
      title: "Sarcini nefinalizate",
      value: data.incompleteTaskCount,
      difference: data.incompleteTaskDifference,
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          disabled={isLoading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Actualizează
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <Card key={item.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      item.negative && item.value > 0 ? "text-red-500" : ""
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-full ${
                    item.negative && item.value > 0
                      ? "bg-red-100"
                      : "bg-muted/20"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      item.negative && item.value > 0
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-x-1">
                {item.difference !== 0 && (
                  <>
                    {item.negative ? (
                      item.difference < 0 ? (
                        <ArrowDown className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowUp className="h-3 w-3 text-red-500" />
                      )
                    ) : item.difference > 0 ? (
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <p
                      className={`text-xs ${
                        (item.negative && item.difference < 0) ||
                        (!item.negative && item.difference > 0)
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {Math.abs(item.difference)}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
