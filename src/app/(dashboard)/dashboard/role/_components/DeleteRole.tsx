"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { deleteRole } from "@/services/role";

const DeleteRole = ({
  id,
  userRole,
  role,
}: {
  id?: string;
  userRole: string | undefined;
  role: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteRole(id);

      if (result.statusCode === 200) {
        setIsOpen(false);
        showSuccessToast(result.message);
      } else {
        setIsOpen(false);
        showErrorToast(result.message);
      }
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            disabled={userRole === role}
            type="button"
            className={`text-red-600 cursor-pointer hover:text-red-800 ${
              userRole === role ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Trash2 size={18} />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              video news and remove your data from our servers.
            </DialogDescription>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button className="bg-gray-300 text-gray-800 hover:bg-gray-200 cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteRole;
