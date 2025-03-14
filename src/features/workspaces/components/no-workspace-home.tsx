"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export const NoWorkspaceHome = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col mt-4 h-full">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Nu faci parte din nici un workspace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">
            Te rugăm să te alături unui workspace pentru a putea accesa
            funcționalitățile aplicației.
          </p>
          <Button
            variant="primary"
            onClick={() => router.push("/workspaces/create")}
          >
            Creează un Workspace
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
