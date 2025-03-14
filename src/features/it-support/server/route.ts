import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { zValidator } from "@hono/zod-validator";
import { createItSupportTaskSchema } from "../schema";
import { Hono } from "hono";
import { itSupportRequestSchema } from "../schema";
import { DATABASE_ID, IT_SUPPORT_COLLECTION_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { ItSupportTaskStatus, ItSupportTaskPriority } from "../types";

const app = new Hono()
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", itSupportRequestSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { name, description, anydesk_id } = c.req.valid("json");

      const itSupportTask = await databases.createDocument(
        DATABASE_ID,
        IT_SUPPORT_COLLECTION_ID,
        ID.unique(),
        {
          name,
          description,
          status: ItSupportTaskStatus.NEW,
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          userId: user.$id,
          priority: ItSupportTaskPriority.LOW,
          requesterName: user.name,
          requesterEmail: user.email,
          anydesk_id: anydesk_id,
        }
      );

      return c.json({ data: itSupportTask });
    }
  )
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    if (user.email === "administrator@mgtecindustry.ro") {
      const tickets = await databases.listDocuments(
        DATABASE_ID,
        IT_SUPPORT_COLLECTION_ID
      );
      return c.json({ data: tickets.documents });
    } else {
      const tickets = await databases.listDocuments(
        DATABASE_ID,
        IT_SUPPORT_COLLECTION_ID,
        [Query.equal("userId", user.$id)]
      );
      return c.json({ data: tickets.documents });
    }
  })
  .patch(
    "/:itSupportTaskId",
    sessionMiddleware,
    zValidator("json", createItSupportTaskSchema.partial()),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const admin = user.email === "administrator@mgtecindustry.ro";

      const { itSupportTaskId } = c.req.param();
      const { status, dueDate, priority } = c.req.valid("json");

      if (!admin) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      try {
        const existingItSupportTask = await databases.getDocument(
          DATABASE_ID,
          IT_SUPPORT_COLLECTION_ID,
          itSupportTaskId
        );

        const updatedTask = await databases.updateDocument(
          DATABASE_ID,
          IT_SUPPORT_COLLECTION_ID,
          itSupportTaskId,
          {
            name: existingItSupportTask.name,
            description: existingItSupportTask.description,
            status,
            dueDate,
            priority,
            anydesk_id: existingItSupportTask.anydesk_id,
            requesterName: existingItSupportTask.requesterName,
            requesterEmail: existingItSupportTask.requesterEmail,
            createdAt: existingItSupportTask.createdAt,
            userId: existingItSupportTask.userId,
          }
        );

        return c.json({ data: updatedTask });
      } catch (error) {
        console.error("Error updating task:", error);
        return c.json({ error: "Failed to update task" }, 500);
      }
    }
  );

export default app;
