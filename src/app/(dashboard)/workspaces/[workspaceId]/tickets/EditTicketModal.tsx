"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditItSupportForm } from "./EditSupportForm";
import { ItSupportTask } from "@/features/it-support/types";

interface EditTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ItSupportTask;
}

export const EditTicketModal = ({
  isOpen,
  onClose,
  task,
}: EditTicketModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <EditItSupportForm onCancel={onClose} initialValues={task} />
      </DialogContent>
    </Dialog>
  );
};
