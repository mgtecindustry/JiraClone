import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetItSupportTasks = () => {
  const query = useQuery({
    queryKey: ["it-support-tasks"],
    queryFn: async () => {
      const response = await client.api.it_support["$get"]();

      if (!response.ok) {
        throw new Error("Failed to fetch IT support tasks");
      }
      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
