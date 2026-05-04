import {useConfirmModalStore} from '@ecoop/shared/store'
import { cn } from '@ecoop/shared/tw-utils'
import {Modal} from '@ecoop/ui/modals'
import { Button } from '@ecoop/ui/core'
import { Separator } from '@ecoop/ui/core'

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
