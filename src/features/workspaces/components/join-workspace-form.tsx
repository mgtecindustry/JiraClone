"use client";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">
          Alătură-te workspace-ului
        </CardTitle>
        <CardDescription>
          Ai fost invitat să te alături workspace-ului{" "}
          <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center justify-between">
          <Button
            variant="secondary"
            type="button"
            asChild
            size="lg"
            disabled={isPending}
            className="w-full lg:w-fit"
          >
            <Link href="/">Anulează</Link>
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isPending}
            size="lg"
            type="button"
            className="w-full lg:w-fit"
          >
            Alătură-te workspace-ului
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
