import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[":workspaceId"]["join"][
        "$post"
      ]({
        param,
        json,
      });
      if (!response.ok) {
        throw new Error("A apărut o eroare la adăugarea workspace-ului");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace-ul a fost adăugat cu succes");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => {
      toast.error("A apărut o eroare la adăugarea workspace-ului");
    },
  });
  return mutation;
};
