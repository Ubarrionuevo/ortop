import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PreviewOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function PreviewOrderDialog({ isOpen, onClose, message }: PreviewOrderDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-4">Vista Previa del Pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <pre className="whitespace-pre-wrap text-sm text-zinc-700 font-mono">
              {message}
            </pre>
          </div>
          <div className="pt-2 text-center text-sm text-zinc-500">
            En modo preview, este mensaje se enviaría por WhatsApp al número configurado.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 