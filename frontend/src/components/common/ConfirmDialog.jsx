import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function ConfirmDialog({
  open,
  onOpenChange,
  title = 'Eliminar habilidad',
  description = 'Esta accion no se puede deshacer.',
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  confirmVariant = 'destructive',
  loading = false,
  onConfirm,
  trigger,
}) {
  const handleConfirm = async () => {
    if (!onConfirm) {
      onOpenChange?.(false)
      return
    }

    await onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button variant={confirmVariant} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Procesando...' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
