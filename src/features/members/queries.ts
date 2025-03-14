import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Query } from "node-appwrite";

export async function getMemberByUserId({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) {
  try {
    const client = await createSessionClient();

    const response = await client.databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("workspaceId", workspaceId), Query.equal("userId", userId)]
    );

    return response.documents.length > 0 ? response.documents[0] : null;
  } catch (error) {
    console.error("Error fetching member:", error);
    return null;
  }
}
