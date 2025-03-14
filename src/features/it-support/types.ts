export enum ItSupportTaskStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}

export enum ItSupportTaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
export interface ItSupportTask {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name: string;
  description: string;
  status: ItSupportTaskStatus;
  dueDate: string;
  createdAt: string;
  userId: string;
  priority: ItSupportTaskPriority;
  requesterName: string;
  requesterEmail: string;
  anydesk_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For any additional fields from Appwrite
}
