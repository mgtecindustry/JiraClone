import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.it_support)[":itSupportTaskId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.it_support)[":itSupportTaskId"]["$patch"]
>;

export const useUpdateItSupportTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.it_support[":itSupportTaskId"][
        "$patch"
      ]({
        json,
        param,
      });
      if (!response.ok) {
        throw new Error("A apărut o eroare la actualizarea ticket-ului");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Ticketul a fost actualizat cu succes");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["it-support-tasks"] });
      queryClient.invalidateQueries({
        queryKey: ["it-support-task", data.$id],
      });
    },
    onError: () => {
      toast.error("A apărut o eroare la actualizarea ticket-ului");
    },
  });
  return mutation;
};
