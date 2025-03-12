import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
  // incerc sa adaug memberul de la care primeste taskul cel de la ID la schema ,
  //  sa pot sa creez un dashboard separat STRICT pentru IT Support,si fiecare user sa vada doar taskurile lui
});
