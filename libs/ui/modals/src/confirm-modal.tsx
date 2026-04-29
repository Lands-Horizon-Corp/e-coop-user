import useConfirmModalStore from '@e-coop-monorepo/shared/store'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import Modal from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import { Separator } from '@e-coop-monorepo/ui/core'

const ConfirmModal = () => {
    const { isOpen, modalData, onConfirm, onClose, onCancel } =
        useConfirmModalStore()

    return (
        <Modal
            className={modalData?.modalClassName}
            description={modalData?.description}
            onOpenChange={onClose}
            open={isOpen}
            title={modalData?.title}
        >
            {modalData?.content}
            {modalData?.hideSeparator ? null : <Separator className="my-1" />}
            <div
                className={cn(
                    `flex justify-end gap-x-2`,
                    modalData?.footerClassName
                )}
            >
                <Button
                    className="bg-muted/60 hover:bg-muted"
                    onClick={onCancel}
                    variant={'ghost'}
                >
                    {modalData?.cancelString}
                </Button>
                <Button onClick={onConfirm}>{modalData?.confirmString}</Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal
