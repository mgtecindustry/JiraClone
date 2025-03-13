"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/date-picker";
import {
  ItSupportTask,
  ItSupportTaskStatus,
  ItSupportTaskPriority,
} from "@/features/it-support/types";
import { useUpdateItSupportTask } from "@/features/it-support/api/use-update-it-support-task";

// Define the form schema for just the fields we want to update
const updateItSupportTaskSchema = z.object({
  status: z.nativeEnum(ItSupportTaskStatus),
  dueDate: z.date().optional(),
  priority: z.nativeEnum(ItSupportTaskPriority),
});

type UpdateItSupportFormValues = z.infer<typeof updateItSupportTaskSchema>;

interface EditItSupportFormProps {
  onCancel?: () => void;
  initialValues: ItSupportTask;
}

export const EditItSupportForm = ({
  onCancel,
  initialValues,
}: EditItSupportFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateItSupportTask();

  // Prepare the form values from the Appwrite document
  const formValues: UpdateItSupportFormValues = {
    status: initialValues.status as ItSupportTaskStatus,
    dueDate: initialValues.dueDate
      ? new Date(initialValues.dueDate)
      : undefined,
    priority: initialValues.priority as ItSupportTaskPriority,
  };

  const form = useForm<UpdateItSupportFormValues>({
    resolver: zodResolver(updateItSupportTaskSchema),
    defaultValues: formValues,
  });

  const onSubmit = (values: UpdateItSupportFormValues) => {
    mutate(
      {
        json: {
          status: values.status,
          dueDate: values.dueDate,
          priority: values.priority,
        },
        param: { itSupportTaskId: initialValues.$id },
      },
      {
        onSuccess: () => {
          form.reset();
          onCancel?.();
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Edit IT Support Ticket
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700">Ticket Info</h3>
                <p className="text-gray-500 text-sm">
                  Name: {initialValues.name}
                </p>
                <p className="text-gray-500 text-sm">
                  Requester: {initialValues.requesterName}
                </p>
                <p className="text-gray-500 text-sm">
                  Email: {initialValues.requesterEmail}
                </p>
                <p className="text-gray-500 text-sm">
                  Created:{" "}
                  {new Date(initialValues.createdAt).toLocaleDateString()}
                </p>
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={ItSupportTaskStatus.NEW}>
                          New
                        </SelectItem>
                        <SelectItem value={ItSupportTaskStatus.IN_PROGRESS}>
                          In Progress
                        </SelectItem>
                        <SelectItem value={ItSupportTaskStatus.RESOLVED}>
                          Resolved
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={ItSupportTaskPriority.LOW}>
                          Low
                        </SelectItem>
                        <SelectItem value={ItSupportTaskPriority.MEDIUM}>
                          Medium
                        </SelectItem>
                        <SelectItem value={ItSupportTaskPriority.HIGH}>
                          High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={isPending}
              >
                Update Ticket
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
