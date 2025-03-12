import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ItSupportRequest } from "../schema";

type ResponseType = InferResponseType<
  (typeof client.api.it_support)["$post"],
  200
>;

export const useCreateItSupportTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, { json: ItSupportRequest }>(
    {
      mutationFn: async ({ json }) => {
        const response = await client.api.it_support["$post"]({ json });
        if (!response.ok) {
          throw new Error("Failed to create it support task");
        }
        return await response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["it-support"] });
        toast.success("It support task created");
      },
      onError: () => {
        toast.error("Failed to create it support task");
      },
    }
  );
  return mutation;
};
