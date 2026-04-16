
"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAdminUser } from "@/services/role";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

const DeleteAdminUserDialog = ({ id, name }: { id?: string; name?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteAdminUser(id);

            if (result.statusCode === 200) {
                setIsOpen(false);
                showSuccessToast(result.message);
                window.location.reload();
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
                        className="w-8 h-8 flex items-center justify-center border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete admin user"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-white text-gray-900 border border-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900">
                            Delete Admin User?
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Are you sure you want to delete <strong>{name || "this admin user"}</strong>? 
                            This action cannot be undone and will permanently remove the user from the system.
                        </DialogDescription>
                        <div className="flex justify-end space-x-2 mt-4">
                            <DialogClose asChild>
                                <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-200 cursor-pointer">
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                onClick={handleDelete}
                                disabled={isPending}
                                className="bg-red-600 text-white hover:bg-red-700 border border-red-600 cursor-pointer"
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

export default DeleteAdminUserDialog;
