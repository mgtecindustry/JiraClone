"use client";
import React from "react";
import { TaskStatus } from "@/features/tasks/types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/features/tasks/schema";
import { z } from "zod";
import { useCreateTask } from "@/features/tasks/api/use-create-task";
import { Textarea } from "@/components/ui/textarea";
import {
  ItSupportFormData,
  itSupportFormSchema,
  ItSupportTask,
} from "@/features/it-support/schema";
import { useCreateItSupportTask } from "@/features/it-support/api/use-create-it-support-task";
import {
  ItSupportTaskPriority,
  ItSupportTaskStatus,
} from "@/features/it-support/types";
const SupportPage = () => {
  const { mutate: createItSupportTask, isPending } = useCreateItSupportTask();

  const form = useForm<ItSupportFormData>({
    resolver: zodResolver(itSupportFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = form.handleSubmit((formData) => {
    createItSupportTask(
      {
        json: {
          name: formData.name,
          description: formData.description,
        },
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  });

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Raportare Problemă IT
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-6">
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subiect Problemă</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: Nu pot accesa emailul, Calculatorul nu pornește"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriere Detaliată a Problemei</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Vă rugăm să descrieți problema în detaliu (când a apărut, ce ați încercat să faceți)"
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DottedSeparator className="py-7" />

            <div className="flex items-center justify-end">
              <Button
                type="button"
                size="lg"
                variant="primary"
                disabled={isPending}
                onClick={handleSubmit}
              >
                {isPending
                  ? "Se trimite solicitarea..."
                  : "Trimite Solicitare Support"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SupportPage;
