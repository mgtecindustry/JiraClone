import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

export const useGetItSupportTasks = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: ["it-support-tasks"],
    queryFn: async () => {
      const response = await client.api.it_support["$get"]();

      if (!response.ok) {
        throw new Error("Failed to fetch IT support tasks");
      }
      const { data } = await response.json();
      router.refresh();
      return data;
    },
  });
  return query;
};
