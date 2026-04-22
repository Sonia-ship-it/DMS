import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, AlertCircle } from 'lucide-react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

export function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}: DeleteConfirmationModalProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="rounded-3xl border border-[#0A0E2E]/10 bg-white shadow-2xl p-8 max-w-md animate-in zoom-in-95 duration-200">
                <AlertDialogHeader className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100 mb-2">
                        <Trash2 className="w-8 h-8" />
                    </div>
                    <AlertDialogTitle className="text-2xl font-bold text-[#0A0E2E] text-center tracking-tight">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[14px] text-[#0A0E2E]/60 text-center font-medium leading-relaxed">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 my-4">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-[12px] font-semibold text-[#0A0E2E]/70">This action is irreversible and will permanently remove the data.</p>
                </div>

                <AlertDialogFooter className="sm:justify-center gap-3 mt-4">
                    <AlertDialogCancel className="flex-1 rounded-xl border border-[#0A0E2E]/15 bg-white text-sm font-bold text-[#0A0E2E] hover:bg-slate-50 h-12">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-red-600 text-sm font-bold text-white hover:bg-red-700 shadow-lg shadow-red-100 h-12"
                    >
                        Delete Now
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
